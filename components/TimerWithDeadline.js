import React, { Component } from "react";
import { Text, View, StyleSheet } from 'react-native';


export default class TimerWithDeadline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: false,
            remainingTime: props.totalDuration
        }

    }

    componentDidMount() {
        if (this.props.start) {
            this.startTimer();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.start) {
            this.startTimer();
        }
        else {
            this.stopTimer();
        }

        if (newProps.reset) {
            this.resetTimer(newProps.totalDuration);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startTimer = () => {

        const endTime = new Date().getTime() + this.state.remainingTime;
        this.interval = setInterval(() => {
            const remainingTime = endTime - new Date();
            if (remainingTime <= 1000) {
                this.setState({ remainingTime: 0 });
                this.stopTimer();
                this.props.handleFinish();
                return;
            }

            this.setState({ remainingTime, start: true });
        }, 1);
    }

    stopTimer = () => {

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.setState({ start: false });
    }

    resetTimer = (totalDuration) => {
        this.setState({ start: false, remainingTime: this.props.totalDuration !== totalDuration ? totalDuration : this.props.totalDuration });
    }

    formatTime = () => {

        let time = this.state.remainingTime;
        let msecs = time % 1000;

        if (msecs < 10) {
            msecs = `00${msecs}`;
        } else if (msecs < 100) {
            msecs = `0${msecs}`;
        }

        let secs = Math.floor(time / 1000);
        let mins = Math.floor(time / 60000);
        let hours = Math.floor(time / 3600000);
        secs = secs - (mins * 60);
        mins = mins - (hours * 60);

        let formattedTime = `${hours < 10 ? 0 : ""}${hours}:${mins < 10 ? 0 : ""}${mins}:${secs < 10 ? 0 : ""}${secs}:${msecs}`;

        this.props.getTime(formattedTime);

        return formattedTime;
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.formatTime()}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 2,
        width: 180,
        backgroundColor: '#6d7075',
    },
    text: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
    },
});