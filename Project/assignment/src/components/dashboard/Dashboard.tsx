import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Add } from '@mui/icons-material';
import { successToaster } from '../../utils/toaster';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [description, setDescription] = useState('');
    const [isItemAdded, setIsItemAdded] = useState(false);

    useEffect(() => {
        if (searchTerm === '') {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                const response = await axios.get(`https://api.npms.io/v2/search/suggestions?q=${searchTerm}`);
                setSuggestions(response.data.map((suggestion: any) => suggestion.package.name));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    const handleSearch = async (value: string) => {

        try {
            /**
             * Checking if item is added already.
             */
            setIsItemAdded(
                JSON.parse(localStorage.getItem('favorites') || '[]').some(
                    (item: any) => item.packageName === value
                )
            );
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const favoriteItem = {
            packageName: searchTerm,
            description: description
        };

        try {
            const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            const updatedFavorites = [...existingFavorites, favoriteItem];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            successToaster("Package added to favourites");
            console.log('Favorite added:', favoriteItem);
        } catch (error) {
            console.error('Error adding favorite:', error);
        }

        setSearchTerm('');
        setDescription('');
    };

    return (
        <section className='page flex justify-center'>
            <form onSubmit={handleSubmit} className='w-full max-w-sm p-4 space-y-4'>
                <h1 className='text-2xl mb-4'>Add to Favorites</h1>
                <Autocomplete
                    freeSolo
                    options={suggestions}
                    renderInput={(params) => <div>
                        <TextField {...params} label="Search for npm packages" />
                        {isItemAdded && (
                            <p className="text-red-500">Item already added to favorites</p>
                        )}
                    </div>}
                    onInputChange={(event, value) => {
                        setSearchTerm(value);
                        setIsItemAdded(false);
                        handleSearch(value);
                    }}
                />
                <TextField
                    label="Why is this your fav?"
                    variant="outlined"
                    fullWidth
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    disabled={!searchTerm || !description || isItemAdded}
                >
                    Add
                </Button>
            </form>
        </section>
    );
}

export default Dashboard;
