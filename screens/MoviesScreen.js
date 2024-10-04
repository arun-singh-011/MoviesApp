import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import {
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from '../api/tmdb';
import MovieList from '../components/MovieList';
import Dropdown from '../components/Dropdown';

const MoviesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('now_playing');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  const fetchMovies = async (category) => {
    setLoading(true);
    try {
      let response;
      switch (category) {
        case 'now_playing':
          response = await fetchNowPlaying();
          break;
        case 'popular':
          response = await fetchPopular();
          break;
        case 'top_rated':
          response = await fetchTopRated();
          break;
        case 'upcoming':
          response = await fetchUpcoming();
          break;
        default:
          response = await fetchNowPlaying();
      }
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        options={categories}
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}
      />
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieList
              item={item}
              onPress={() =>
                navigation.navigate('Details', {
                  id: item.id,
                  type: 'movie',
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MoviesScreen;
