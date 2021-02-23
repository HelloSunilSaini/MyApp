import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, Dimensions} from 'react-native';
import Article from './screens/Article';
import {GetArticleData} from './services/google-sheets';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      noDataFound: true,
      count: 0,
      offset: 2,
      limit: 10,
      articleNumber: 1,
      loading: true,
      data: [],
      dataIndex: 0,
      dataCount: 0,
    };
  }

  componentDidMount() {
    this.getdata(this.state.offset, this.state.limit);
  }

  getdata = (offset, limit) => {
    this.setState({loading: true});
    GetArticleData(offset, limit).then((result) => {
      console.log(result);
      if (result.hasOwnProperty('valueRanges')) {
        if (
          result.valueRanges.length > 0 &&
          result.valueRanges[0].hasOwnProperty('values')
        ) {
          if (result.valueRanges[0].values[0].length < 1) {
            this.setState({noDataFound: true});
          }
          this.setState({
            limit: limit,
            offset: offset,
            data: result.valueRanges[0].values,
            dataCount: result.valueRanges[0].values[0].length,
            dataIndex: 0,
            loading: false,
            noDataFound: false,
          });
        } else {
          this.setState({loading: false, noDataFound: true});
        }
      } else {
        this.setState({loading: false, noDataFound: true});
      }
    });
  };

  prevArticle = () => {
    if (this.state.articleNumber !== 1) {
      if (this.state.dataIndex === 0) {
        this.getdata(this.state.offset - this.state.limit, this.state.limit);
        this.setState({
          articleNumber: this.state.articleNumber - this.state.dataCount,
        });
      } else {
        this.setState({
          articleNumber: this.state.articleNumber - 1,
          dataIndex: this.state.dataIndex - 1,
        });
      }
    }
  };

  nextArticle = () => {
    if (this.state.dataIndex + 1 < this.state.dataCount) {
      this.setState({
        articleNumber: this.state.articleNumber + 1,
        dataIndex: this.state.dataIndex + 1,
      });
    } else {
      if (this.state.dataCount === this.state.limit) {
        this.getdata(this.state.offset + this.state.limit, this.state.limit);
        this.setState({articleNumber: this.state.articleNumber + 1});
      }
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text> Loading... </Text>
        </View>
      );
    } else if (this.state.noDataFound) {
      return (
        <View style={styles.noMoreData}>
          <Text> No More Data </Text>
          <View style={styles.prev}>
            <Button
              title={'Prev'}
              style={styles.button}
              onPress={this.prevArticle}>
              Prev
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Article data={this.state.data[this.state.dataIndex]} />
          <View style={styles.prevNext}>
            <Button
              title={'Prev'}
              style={styles.button}
              onPress={this.prevArticle}>
              Prev
            </Button>
            <Button
              title={'Next'}
              style={styles.button}
              onPress={this.nextArticle}>
              Next
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noMoreData: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prev: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  prevNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  button: {
    margin: 10,
    backgroundColor: '#80e9db',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width / 5) * 2,
    height: 10,
  },
});
