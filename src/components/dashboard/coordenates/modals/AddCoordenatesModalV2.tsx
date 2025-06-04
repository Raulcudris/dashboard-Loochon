'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
    Box,
    Button,
    Grid,
    Stack,
    TextField,
    Modal,
    IconButton,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import {
    NewCoordenate,
    defaultNewCoordenate,
    Country,
    State,
    City,
} from '@/interface';
import {
    getAllCountries,
    getStatesByCountry,
    getCitiesByState,
} from '@/services';
import { useCoordenates } from '@/hooks/use-coordenates';
import { BaseModal } from './BaseModal';

const MapComponent = dynamic(() => import('./Maps/MapComponent'), { ssr: false });

const mapContainerStyle = { height: '400px', width: '100%' };
const largeMapModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

interface AddCoordenatesModalV2Props {
    open: boolean;
    onClose: () => void;
    onCoordenateAdded: () => void;
}

export const AddCoordenatesModalV2: React.FC<AddCoordenatesModalV2Props> = ({ open, onClose, onCoordenateAdded }) => {
    const [newCoordenate, setNewCoordenate] = useState<NewCoordenate>(defaultNewCoordenate);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [largeMapOpen, setLargeMapOpen] = useState<boolean>(false);
    const [temporaryCoordenate, setTemporaryCoordenate] = useState<NewCoordenate>(defaultNewCoordenate);

    const { createCoordenate, loading } = useCoordenates();

    useEffect(() => {
        const loadCountries = async () => {
            const fetched = await getAllCountries();
            setCountries(fetched);
        };
        loadCountries();
    }, []);

    useEffect(() => {
        const loadStates = async () => {
            if (!newCoordenate.sisCodpaiSipa) return;
            const fetched = await getStatesByCountry(newCoordenate.sisCodpaiSipa);
            setStates(fetched);
            setNewCoordenate((prev) => ({ ...prev, sisIdedptSidp: '', sisCodmunSimu: '' }));
            setCities([]);
        };
        loadStates();
    }, [newCoordenate.sisCodpaiSipa]);

    useEffect(() => {
        const loadCities = async () => {
            if (!newCoordenate.sisIdedptSidp) {
                return;
            }
            const fetched = await getCitiesByState(newCoordenate.sisIdedptSidp);
            setCities(fetched);
            setNewCoordenate((prev) => ({ ...prev, sisCodmunSimu: '' }));
        };
        loadCities();
    }, [newCoordenate.sisIdedptSidp]);

    const handleInputChange = (field: keyof NewCoordenate, value: any): void => {
        setNewCoordenate((prev) => ({ ...prev, [field]: value }));
    };

    const uniqueCities = Array.from(new Map(cities.map(city => [city.sisCodmunSimu, city])).values());

    const handleSave = async (showSnackbar: (message: string, severity: 'success' | 'error') => void): Promise<void> => {
        if (!newCoordenate.sisNombreSipr.trim() || !newCoordenate.sisGeolatSipr || !newCoordenate.sisGeolonSipr) {
            showSnackbar('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }
        const success = await createCoordenate(newCoordenate);
        if (success) {
            showSnackbar('Coordenada creada con éxito.', 'success');
            onCoordenateAdded();
            onClose();
            setNewCoordenate(defaultNewCoordenate);
        } else {
            showSnackbar('Error al crear la coordenada.', 'error');
        }
    };

    return (
        <>
            <BaseModal open={open} onClose={onClose} title="Añadir Coordenada">
                {({ showSnackbar }) => (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>País</InputLabel>
                                    <Select
                                        value={newCoordenate.sisCodpaiSipa}
                                        onChange={(e: SelectChangeEvent) => handleInputChange('sisCodpaiSipa', e.target.value)}
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.sisCodpaiSipa} value={country.sisCodpaiSipa}>{country.sisNombreSipa}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }} disabled={!newCoordenate.sisCodpaiSipa}>
                                    <InputLabel>Departamento</InputLabel>
                                    <Select
                                        value={newCoordenate.sisIdedptSidp || ''}
                                        onChange={(e: SelectChangeEvent) => handleInputChange('sisIdedptSidp', e.target.value)}
                                    >
                                        {states.map((state) => (
                                            <MenuItem key={state.sisIdedptSidp} value={state.sisIdedptSidp}>{state.sisNombreSidp}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ mb: 2 }} disabled={!newCoordenate.sisIdedptSidp}>
                                    <InputLabel>Municipio</InputLabel>
                                    <Select
                                        value={uniqueCities.find(c => c.sisCodmunSimu === newCoordenate.sisCodmunSimu) ? newCoordenate.sisCodmunSimu : ''}
                                        onChange={(e: SelectChangeEvent) => handleInputChange('sisCodmunSimu', e.target.value)}
                                    >
                                        {uniqueCities.map((city) => (
                                            <MenuItem key={city.sisCodmunSimu} value={city.sisCodmunSimu}>
                                                {city.sisNombreSimu}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField label="Nombre Provincia" value={newCoordenate.sisNombreSipr} fullWidth onChange={(e) => handleInputChange('sisNombreSipr', e.target.value)} sx={{ mb: 2 }} />
                                <TextField label="Código Provincia" value={newCoordenate.sisCodproSipr} fullWidth onChange={(e) => handleInputChange('sisCodproSipr', e.target.value)} sx={{ mb: 2 }} />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField label="Código Postal" value={newCoordenate.sisCodposSipr} fullWidth onChange={(e) => handleInputChange('sisCodposSipr', e.target.value)} sx={{ mb: 2 }} />
                                <TextField label="Clase Provincia" value={newCoordenate.sisProclaSipr} fullWidth onChange={(e) => handleInputChange('sisProclaSipr', e.target.value)} sx={{ mb: 2 }} />
                                <TextField label="Estado Registro" value={newCoordenate.sisEstregSipr} fullWidth onChange={(e) => handleInputChange('sisEstregSipr', e.target.value)} sx={{ mb: 2 }} />
                                <TextField label="Latitud" type="number" value={newCoordenate.sisGeolatSipr} fullWidth onChange={(e) => handleInputChange('sisGeolatSipr', parseFloat(e.target.value))} sx={{ mb: 2 }} />
                                <TextField label="Longitud" type="number" value={newCoordenate.sisGeolonSipr} fullWidth onChange={(e) => handleInputChange('sisGeolonSipr', parseFloat(e.target.value))} sx={{ mb: 2 }} />
                            </Grid>

                            <Grid item xs={4}>
                                <Box sx={mapContainerStyle}>
                                    <MapComponent
                                        coordinates={[newCoordenate.sisGeolatSipr, newCoordenate.sisGeolonSipr]}
                                        setCoordinates={([lat, lng]) => {
                                            handleInputChange('sisGeolatSipr', lat);
                                            handleInputChange('sisGeolonSipr', lng);
                                        }}
                                    />
                                    <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
                                        <Button variant="contained" onClick={() => { setTemporaryCoordenate({ ...newCoordenate }); setLargeMapOpen(true); }}>
                                            Ampliar vista
                                        </Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" onClick={() => handleSave(showSnackbar)} disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar'}
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={onClose}>
                                Cancelar
                            </Button>
                        </Stack>
                    </>
                )}
            </BaseModal>

            <Modal open={largeMapOpen} onClose={() => setLargeMapOpen(false)}>
                <Box sx={largeMapModalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={() => setLargeMapOpen(false)}
                        sx={{ position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        &times;
                    </IconButton>
                    <MapComponent
                        coordinates={[temporaryCoordenate.sisGeolatSipr, temporaryCoordenate.sisGeolonSipr]}
                        setCoordinates={([lat, lng]) => {
                            setTemporaryCoordenate((prev) => ({ ...prev, sisGeolatSipr: lat, sisGeolonSipr: lng }));
                        }}
                        isDraggable={true}
                        isFullScreen={true}
                    />
                    <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" onClick={() => { setNewCoordenate({ ...temporaryCoordenate }); setLargeMapOpen(false); }}>
                            Guardar Ubicación
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setLargeMapOpen(false)}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};
