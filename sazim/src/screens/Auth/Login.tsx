import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleLogin = async () => {
        setError('');
        setEmailError('');
        setPasswordError('');

        // Validate email
        if (!email.trim()) {
            setEmailError('Email cannot be empty');
            return;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // Validate password
        if (!password.trim()) {
            setPasswordError('Password cannot be empty');
            return;
        }

        // Check AsyncStorage for stored user data
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);

                // Check if the email and password match the stored user
                if (user.email === email && user.password === password) {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        Alert.alert('Login successful');
                        // Navigate to the next screen or perform post-login actions
                    }, 1000);
                } else {
                    setError('Invalid email or password');
                }
            } else {
                setError('No user found. Please register first');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to retrieve user data');
        }
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const getInputStyle = (hasError: boolean) => {
        return StyleSheet.flatten([styles.input, hasError && styles.inputError]);
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                {/* Headline */}
                <Text style={styles.headline}>SIGN IN</Text>

                {/* Email Input */}
                <TextInput
                    style={getInputStyle(!!emailError)}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                {/* Password Input */}
                <TextInput
                    style={getInputStyle(!!passwordError)}
                    placeholder="Enter your password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'LOGIN'}</Text>
                </TouchableOpacity>

                {/* Signup link */}
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View></TouchableWithoutFeedback>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    headline: {
        fontSize: 32,
        marginBottom: 40,
        color: '#4B0082',
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
    },
    button: {
        width: '40%',
        height: 50,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -10,
        marginBottom: 20,

    },
});

export default Login;

