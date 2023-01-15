import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setloading] = useState(false);

  const serviceURL = 'https://api.postalpincode.in/postoffice/';

  const onFetchData = () => {
    setloading(true);
    fetch(serviceURL + input)
      .then(response => response.json())
      .then(result => {
        setloading(false);
        const op =
          result[0].Status === '404' ? result[0].Message : result[0].PostOffice;
        setData(op);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <TextInput
        style={styles.inputContainer}
        placeholder={'Please enter city name'}
        placeholderTextColor={'black'}
        color={'black'}
        onChangeText={text => setInput(text)}
      />
      <Button title={'Fetch Data!'} onPress={onFetchData} />
      <View style={styles.dataContainer}>
        {Array.isArray(data) ? (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <Text style={styles.textColor}>Name: {item.Name}</Text>
                <Text style={styles.textColor}>Branch: {item.BranchType} </Text>
                <Text style={styles.textColor}>State: {item.State}</Text>
                <Text style={styles.textColor}>Pincode: {item.Pincode}</Text>
              </View>
            )}
            ItemSeparatorComponent={ItemDivider}
          />
        ) : (
          <Text style={{color: 'black'}}>{data}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    paddingLeft: 10,
    height: 45,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  dataContainer: {
    paddingTop: 8,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: 'black',
  },
});
