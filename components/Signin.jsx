import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signInUser } = UserAuth(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle OAuth Sign-In
  const handleOAuthSignIn = async (provider) => {
    // Log the selected OAuth provider before redirection happens
    console.log("Attempting OAuth with provider:", provider);
  
    // Show loading state and clear previous messages
    setLoading(true);
    setMessage("");
  
    try {
      // Trigger the Supabase OAuth process with proper options
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
  
      if (error) {
        // Log and display the error
        console.error("OAuth error:", error.message);
        setMessage(`Error signing in with ${provider}: ${error.message || "Please try again later."}`);
      } else if (data) {
        // Success feedback - this might not get seen if redirect happens quickly
        setMessage(`Redirecting to ${provider} login...`);
      }
    } catch (err) {
      // Catch unexpected errors and log them
      console.error("Unexpected error during OAuth:", err);
      setMessage("An unexpected error occurred. Please check your connection and try again.");
    } finally {
      // Reset the loading state
      setLoading(false);
    }
  };

  const handleSignIn = async (data) => {
    try {
      // Attempt to sign in the user
      const result = await signInUser(data.email, data.password);

      if (result && result.success) {
        // Navigate to dashboard if sign-in is successful
        navigate("/dashboard");
      } else if (result && result.error) {
        // Inform user about specific errors from signInUser
        setMessage(result.error || "Sign-in failed. Please check your credentials.");
      } else {
        // Handle unexpected cases
        throw new Error("Sign-in failed due to an unknown issue.");
      }
    } catch (err) {
      // Log unexpected errors and notify the user
      console.error("An error occurred:", err);
      setMessage(err.message || "An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-sm bg-gray-900 text-white shadow-xl rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          
          {/* Display error/success messages */}
          {message && (
            <div className={`mb-4 p-2 rounded text-sm ${message.includes("Error") ? "bg-red-800" : "bg-blue-800"}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 bg-gray-800 border-gray-700 text-white"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="mt-1 bg-gray-800 border-gray-700 text-white"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 mt-4"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="my-4 text-center">
              <span className="text-gray-400">Or continue with</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <Button
                type="button"
                disabled={loading}
                className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-2 px-4"
                onClick={() => handleOAuthSignIn("google")}
              >
                <FaGoogle className="mr-2" /> {loading ? "Processing..." : "Sign in with Google"}
              </Button>
              <Button
                type="button"
                disabled={loading}
                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 px-4"
                onClick={() => handleOAuthSignIn("facebook")}
              >
                <FaFacebook className="mr-2" /> {loading ? "Processing..." : "Sign in with Facebook"}
              </Button>
              <Button
                type="button"
                disabled={loading}
                className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg py-2 px-4"
                onClick={() => handleOAuthSignIn("github")}
              >
                <FaGithub className="mr-2" /> {loading ? "Processing..." : "Sign in with GitHub"}
              </Button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot Your Password?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;