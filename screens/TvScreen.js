import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import {
  fetchAiringToday,
  fetchTVPopular,
  fetchTVTopRated,
  fetchOnTheAir,
} from '../api/tmdb';
import MovieListItem from '../components/MovieList';
import Dropdown from '../components/Dropdown';

const TVScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('airing_today');
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'On The Air', value: 'on_the_air' },
  ];

  useEffect(() => {
    fetchTV(selectedCategory);
  }, [selectedCategory]);

  const fetchTV = async (category) => {
    setLoading(true);
    try {
      let response;
      switch (category) {
        case 'airing_today':
          response = await fetchAiringToday();
          break;
        case 'popular':
          response = await fetchTVPopular();
          break;
        case 'top_rated':
          response = await fetchTVTopRated();
          break;
        case 'on_the_air':
          response = await fetchOnTheAir();
          break;
        default:
          response = await fetchAiringToday();
      }
      setTVShows(response.data.results);
    } catch (error) {
      console.error(error);
      // Handle error
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
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieListItem
              item={item}
              onPress={() =>
                navigation.navigate('Details', { id: item.id, type: 'tv' })
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

export default TVScreen;
