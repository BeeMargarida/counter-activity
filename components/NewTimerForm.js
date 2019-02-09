import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
    displayStopwatchForm: true,
    name: "",
    hoursInput: "00",
    minutesInput: "00",
    secondsInput: "00",
    totalDuration: null
}

export default class NewTimerForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    toggleForms = (value) => {
        this.setState({ displayStopwatchForm: value });
    }

    createNewTimer = (isTimer) => {
        if (isTimer) {
            let { hoursInput, minutesInput, secondsInput } = this.state;
            if (parseInt(minutesInput) > 60 || parseInt(secondsInput) > 60) {

                Alert.alert("Total Duration input is invalid", "Please insert a valid time.", [{ text: 'Ok' }]);
                return;
            }
            let miliseconds = parseInt(hoursInput) * 3600000 + parseInt(minutesInput) * 60000 + parseInt(secondsInput) * 1000;
            this.props.addNewCounter(this.state.name, miliseconds);

        }
        else {
            this.props.addNewCounter(this.state.name, undefined);
        }

        this.setState(initialState);
        this.props.cancelForm();
    }

    cancel = () => {
        this.setState(initialState);
        this.props.cancelForm();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.tabBar}>
                    <TouchableOpacity onPress={() => this.toggleForms(true)} style={this.state.displayStopwatchForm ? [styles.tabBarButton, styles.tabBarButtonPressed] : styles.tabBarButton}>
                        <Text style={this.state.displayStopwatchForm ? styles.textSelected : styles.text}>Stopwatch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.toggleForms(false)} style={!this.state.displayStopwatchForm ? [styles.tabBarButton, styles.tabBarButtonPressed] : styles.tabBarButton}>
                        <Text style={!this.state.displayStopwatchForm ? styles.textSelected : styles.text}>Timer</Text>
                    </TouchableOpacity>
                </View>
                {this.state.displayStopwatchForm ?
                    (
                        <View style={styles.formStopwatch}>
                            <TextInput
                                style={styles.counterNameInput}
                                placeholder="Write here the counter name..."
                                value={this.state.name}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <View style={styles.submitButtons}>
                                <TouchableOpacity onPress={this.cancel} style={[styles.buttons, styles.cancelButton]}>
                                    <Icon name="times" color="white" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.createNewTimer(false)} style={[styles.buttons, styles.submitButton]}>
                                    <Icon name="check" color="white" size={14} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    ) :
                    (
                        <View style={styles.form}>
                            <TextInput
                                style={styles.counterNameInput}
                                placeholder="Write here the counter name..."
                                value={this.state.name}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <Text style={styles.textTitle}>Total Duration</Text>
                            <View style={styles.timeContainer}>
                                <TextInput
                                    keyboardType="number-pad"
                                    style={[styles.timeInput, styles.hourInput]}
                                    value={this.state.hoursInput}
                                    maxLength={2}
                                    onChangeText={(text) => this.setState({ hoursInput: text })}
                                />
                                <Text style={styles.textHour}>:</Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    style={styles.timeInput}
                                    value={this.state.minutesInput}
                                    maxLength={2}
                                    onChangeText={(text) => this.setState({ minutesInput: text })}
                                />
                                <Text style={styles.textHour}>:</Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    style={[styles.timeInput, styles.secondsInput]}
                                    value={this.state.secondsInput}
                                    maxLength={2}
                                    onChangeText={(text) => this.setState({ secondsInput: text })}
                                />
                            </View>
                            <View style={styles.submitButtons}>
                                <TouchableOpacity onPress={this.cancel} style={[styles.buttons, styles.cancelButton]}>
                                    <Icon name="times" color="white" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.createNewTimer(true)} style={[styles.buttons, styles.submitButton]}>
                                    <Icon name="check" color="white" size={14} style={styles.borders} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1.3,
        flexDirection: 'column',
        marginHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 5,
        elevation: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,

        bottom: 72,
        left: 0,
        right: 0,
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarButton: {
        flex: 1,
        backgroundColor: "#c1c5cc",
        borderBottomWidth: 2,
        borderBottomColor: "grey"
    },
    tabBarButtonPressed: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "grey",
        borderBottomWidth: 0,

    },
    counterNameInput: {
        marginVertical: 10,
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    text: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
    },
    textSelected: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    textTitle: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: "grey",
        borderTopWidth: 0,
    },
    formStopwatch: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: "25%",
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "grey",
        borderTopWidth: 0,
    },
    timeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 2,
        backgroundColor: "#6d7075",
        borderRadius: 50,
        color: "#fff",
    },
    timeInput: {
        fontSize: 24,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 0,
        marginHorizontal: 0,
        flex: 2,
        color: "#fff",
    },
    hourInput: {
        textAlign: 'right',
    },
    secondsInput: {
        textAlign: 'left',
    },
    textHour: {
        fontSize: 17,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        textAlign: 'center',
        flex: 1,
        color: "#fff",
    },
    submitButtons: {
        flex: 1,
        justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: "row",
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
        padding: 0,
    },
    submitButton: {
        flex: 1,
        backgroundColor: 'green',
        borderRadius: 100,
        height: 55,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 100,
        height: 55,
    }
})