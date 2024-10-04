import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { fetchMovieDetails, fetchTVDetails } from '../api/tmdb';

const DetailsScreen = ({ route }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, type } = route.params;

  useEffect(() => {
    fetchDetails();
  }, [id, type]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response =
        type === 'movie'
          ? await fetchMovieDetails(id)
          : await fetchTVDetails(id);
      setDetails(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size='large' color='#0000ff' style={styles.loader} />
    );
  }

  if (!details) {
    return <Text style={styles.error}>Failed to load details.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{details.title || details.name}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
        }}
        style={styles.poster}
      />
      <Text style={styles.subtitle}></Text>
      <Text style={styles.overview}>{details.overview}</Text>
      <Text style={styles.txt}>
        Popularity: {details.popularity} | Release Date: {details.release_date}
      </Text>
      {/* Add more details as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  txt: {
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  poster: {
    width: 280,
    height: 340,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  overview: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'justify',
  },
});

export default DetailsScreen;
