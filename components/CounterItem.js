import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CounterItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "New Counter " + this.props.counterId,
            startCounter: false,
            resetCounter: false,
        }

        this.getFormattedTime = this.getFormattedTime.bind(this);
        this.toggleCounter = this.toggleCounter.bind(this);
        this.resetCounter = this.resetCounter.bind(this);
        this.triggerAlarm = this.triggerAlarm.bind(this);
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };

    toggleCounter() {
        this.setState(prevState => ({ startCounter: !prevState.startCounter, resetCounter: false }));
    }

    resetCounter() {
        this.setState({ startCounter: false, resetCounter: true });
    }

    triggerAlarm() {

    }

    render() {

        let timer = <Stopwatch msecs start={this.state.startCounter}
            reset={this.state.resetCounter}
            options={options}
            getTime={this.getFormattedTime}
        />;
        if (this.props.totalDuration !== undefined) {
            timer = <Timer msecs start={this.state.startCounter}
                reset={this.state.resetCounter}
                options={options}
                getTime={this.getFormattedTime}
                totalDuration={this.props.totalDuration}
                handleFinish={this.triggerAlarm}
            />
        }

        let mainIcon = <Icon name="play" color="white" size={25} />;
        if (this.state.startCounter) {
            mainIcon = <Icon name="pause" color="white" size={25} />;
        }

        return (
            <View style={styles.counterContainer}>
                <View style={styles.mainInfoContainer}>
                    <TextInput style={styles.counterText}
                        value={this.state.title}
                        onEndEditing={() => this.setState({ editTitle: false })}
                        onChangeText={(text) => this.setState({ title: text })}
                    />
                    {timer}
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.toggleCounter} style={[styles.counterButton, styles.startButton]}>
                        {mainIcon}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.resetCounter} style={[styles.counterButton, styles.resetButton]}>
                        <Icon name="stop" color="white" size={14} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.deleteCounter(this.props.counterId)} style={[styles.counterButton, styles.deleteButton]}>
                        <Icon name="trash" color="white" size={14} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counterContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 5,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        height: 125,
    },
    mainInfoContainer: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    startButton: {
        backgroundColor: 'green',
        flex: 2,
        width: 80,
        height: 60,
    },
    resetButton: {
        backgroundColor: 'orange',
        flex: 1,
        width: 100,
        height: 30,
    },
    deleteButton: {
        backgroundColor: 'red',
        flex: 1,
        width: 100,
        height: 30,
    },
    counterButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 100,
        marginHorizontal: 2
    },
    counterText: {
        marginBottom: 10,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 20,
        textAlign: 'center',
    },
});

const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: 160
    },
    text: {
        fontSize: 21,
        color: '#FFF',
        marginLeft: 7,
        textAlign: 'center'
    }
};