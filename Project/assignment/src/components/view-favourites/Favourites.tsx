import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteConfirmationDialog from '../../utils/Dialog';

interface FavouritePackage {
    packageName: string;
    description: string;
}

const Favourites: React.FC = () => {
    const [favouritePackages, setFavouritePackages] = useState<FavouritePackage[]>([]);
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // Fetch the favorite packages from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as FavouritePackage[];;
        setFavouritePackages(storedFavorites);
    }, []);

    const handleDelete = (index: number) => {
        setDeleteIndex(index);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        if (deleteIndex !== -1) {
            const updatedFavorites = [...favouritePackages];
            updatedFavorites.splice(deleteIndex, 1);
            setFavouritePackages(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
        setDeleteIndex(-1);
        setOpenDialog(false);
    };

    const cancelDelete = () => {
        setDeleteIndex(-1);
        setOpenDialog(false);
    };

    return (
        <section className='page flex justify-center'>
            <div className='w-screen mx-auto p-4'>
                <Link to='/dashboard'>
                    <Button>
                        <ArrowBackIcon /> Back to Dashboard
                    </Button>
                </Link>
                <Typography variant="h4" >
                    Favourite Packages
                </Typography>
                {favouritePackages.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Package Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favouritePackages.map((favorite: FavouritePackage, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{favorite.packageName}</TableCell>
                                        <TableCell>{favorite.description}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-red-500"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div className="text-center mt-4">
                        <Typography variant="h4">
                            No favourite packages added. <Link to='/dashboard' className="underline text-blue-500">Click here to add.</Link>
                        </Typography>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                <DeleteConfirmationDialog
                    open={openDialog}
                    onClose={cancelDelete}
                    onConfirm={confirmDelete}
                    dialogTitleMessage="Confirm Delete"
                    contentTextMessage="Are you sure you want to delete this package from favorites?"
                    cancelTextMessage="Cancel"
                    confirmTextMessage="Delete"
                />
            </div>
        </section>
    );
}

export default Favourites;
