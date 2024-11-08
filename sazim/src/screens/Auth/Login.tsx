import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [error, setError] = useState<string>('');
     const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = () => {
        setError('');
        if (!email.trim()) {
            setEmailError('Email cannot be empty');
            return;
        }
        else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {

            setPasswordError('Password cannot be empty');
            return;
        } else {
            setPasswordError('');
        }

        if (email === 'test@example.com' && password === 'password') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                console.log('Login successful');
                // Navigate to the next screen or perform post-login actions
            }, 1000);
        } else {
            setEmailError('')
            setPasswordError('')
            setError('Invalid email or password');
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
        <View style={styles.container}>
            {/* Headline */}
            <Text style={styles.headline}>Sign In</Text>

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
              <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>

            {/* Signup link */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        fontWeight: 'bold',
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
        marginBottom:20,

    },
});

export default Login;

