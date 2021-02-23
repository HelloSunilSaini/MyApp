import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Linking} from 'react-native';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL:
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202004/Rajasthan-High-Court-Building--770x433.jpeg?tkRoih4ZzqHienrchCq5kWe5spwCOA4q',
      title:
        'Rajasthan High Court adjourns matter after lawyer appears in vest during video conference',
      content:
        'he Rajasthan High Court has taken a grim view of a lawyer appearing before the court during a video conference wearing a vest or a baniyan. The incident occurred on Friday as a lawyer, Ravindra Kumar Paliwal, appeared before Justice Sanjeev Prakash Sharma during a video conference in a baniyan.',
      linkURL:
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202004/Rajasthan-High-Court-Building--770x433.jpeg?tkRoih4ZzqHienrchCq5kWe5spwCOA4q',
    };
  }

  componentDidMount() {
    if (this.props.data && this.props.data.length > 3) {
      this.setState({
        imageURL: this.props.data[2],
        title: this.props.data[0],
        content: this.props.data[1],
        linkURL: this.props.data[3],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.headerImg} source={{uri: this.state.imageURL}} />
        <Text style={styles.title}> {this.state.title} </Text>
        <Text style={styles.content}> {this.state.content} </Text>
        <Text
          style={styles.seemore}
          onPress={() => Linking.openURL(this.state.linkURL)}>
          See More ...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerImg: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seemore: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'right',
  },
});
