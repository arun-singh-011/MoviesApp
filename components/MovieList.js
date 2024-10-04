import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';

const MovieList = ({ item, navigation, onPress }) => {
  const title = item.title || item.name;
  const imageURL = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/200';

  return (
    <View style={styles.container}>
      {/* Movie image */}
      <View style={styles.imgWrapper}>
        <Image source={{ uri: imageURL }} style={styles.image} />
      </View>

      {/* Movie info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.txt}>Popularity: {item.popularity}</Text>
        <Text style={styles.txt}>Release Date: {item.release_date}</Text>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('Details', { id: item.id, type: 'movie' })
          // }
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgWrapper: {
    width: '50%',
  },
  image: {
    width: 100,
    height: 150,
    contentFit: 'object-fit',
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'start',
    flexWrap: 'wrap',
    width: '50%',
    height: 150,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt: {
    marginTop: 10,
  },
  button: {
    backgroundColor: 'skyblue',
    color: 'white',
    padding: 8,
    width: '100%',
    marginTop: 10,
    fontSize: 16,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
