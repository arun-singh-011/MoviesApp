import React, { useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { searchMulti } from '../api/tmdb';
import MovieListItem from '../components/MovieList';
import Dropdown from '../components/Dropdown';
import SearchBar from '../components/SearchBar';
const SearchScreen = ({ navigation }) => {
  const [searchType, setSearchType] = useState('movie');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchTypes = [
    { label: 'Movie', value: 'movie' },
    { label: 'TV', value: 'tv' },
    { label: 'Multi', value: 'multi' },
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a search query.');
      return;
    }
    setLoading(true);
    try {
      const response = await searchMulti(query, searchType);
      // Filter results based on searchType
      let filteredResults = response.data.results;
      if (searchType !== 'multi') {
        filteredResults = filteredResults.filter(
          (item) => item.media_type === searchType
        );
      }
      setResults(filteredResults);
      setSearched(true);
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        query={query}
        onChangeText={setQuery}
        onSubmit={handleSearch}
      />
      <View style={styles.searchWrapper}>
        <Dropdown
          options={searchTypes}
          selectedValue={searchType}
          onValueChange={(value) => setSearchType(value)}
        />
      </View>

      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : searched ? (
        results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieListItem
                item={item}
                onPress={() =>
                  navigation.navigate('Details', {
                    id: item.id,
                    type: item.media_type,
                  })
                }
              />
            )}
          />
        ) : (
          <Text style={styles.message}>No results found.</Text>
        )
      ) : (
        <Text style={styles.message}>Please enter a search query.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SearchScreen;
