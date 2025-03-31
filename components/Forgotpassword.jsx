
import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Import your Supabase instance
import { Button } from "./ui/Button"; // Reusable Button component
import { Input } from "./ui/Input"; // Reusable Input component
import { Label } from "./ui/Label"; // Reusable Label component

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState("email"); // "email", "otp", or "reset"
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP to the user's email
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("OTP sent successfully! Please check your email.");
        setStage("otp"); // Move to OTP verification stage
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setMessage("An unexpected error occurred. Please try again.");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP and allow password reset
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // Use the Supabase API to verify OTP and reset the password
      const { error } = await supabase.auth.updateUser({
        email,
        password: newPassword,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Password reset successful! You can now log in.");
        setStage("email"); // Reset to the initial stage
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setMessage("An unexpected error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        {stage === "email" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOtp();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        )}

        {stage === "otp" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStage("reset"); // Move to password reset stage after OTP verification
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </Button>
          </form>
        )}

        {stage === "reset" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
export default ForgetPassword;

//Reset Password using Phone OTP
// import React, { useState } from "react";
// import { supabase } from "../supabaseClient"; // Import your Supabase instance
// import { Button } from "./ui/Button"; // Reusable Button component
// import { Input } from "./ui/Input"; // Reusable Input component
// import { Label } from "./ui/Label"; // Reusable Label component

// const Forgotpassword = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [stage, setStage] = useState("phone"); // "phone", "otp", or "reset"
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Step 1: Send OTP to Phone Number
//   const handleSendOtp = async () => {
//     setLoading(true); // Start loading
//     setMessage(""); // Clear previous messages
//     try {
//       // Ensure the phone number is formatted correctly
//       if (!phone.startsWith("+91")) {
//         setMessage("Phone number must be in E.164 format (e.g., +1234567890).");
//         setLoading(false);
//         return;
//       }
  
//       // Call Supabase to send the OTP
//       const { error } = await supabase.auth.signInWithOtp({ phone });
  
//       if (error) {
//         // Handle and log the specific error
//         console.error("Error sending OTP:", error.message);
//         setMessage(error.message || "Failed to send OTP. Please try again later.");
//       } else {
//         // Notify user of success and move to OTP verification stage
//         setMessage("OTP sent to your phone number.");
//         setStage("otp"); // Switch to OTP input stage
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setMessage("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   // Step 2: Verify OTP and Allow Password Reset
//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.verifyOtp({
//         phone,
//         token: otp,
//         type: "sms", // Verify SMS OTP
//       });

//       if (error) {
//         setMessage(error.message);
//       } else {
//         setMessage("OTP verified! You can now reset your password.");
//         setStage("reset"); // Move to password reset stage
//       }
//     } catch (err) {
//       console.error("Error verifying OTP:", err);
//       setMessage("An unexpected error occurred. Please try again.");
//     }
//     setLoading(false);
//   };

//   // Step 3: Reset Password
//   const handleResetPassword = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.updateUser({
//         password: newPassword,
//       });

//       if (error) {
//         setMessage(error.message);
//       } else {
//         setMessage("Password reset successfully! You can now log in.");
//         setStage("phone"); // Reset to initial stage
//       }
//     } catch (err) {
//       console.error("Error resetting password:", err);
//       setMessage("An unexpected error occurred. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
//       <div className="w-full max-w-md bg-gray-900 rounded-lg p-6 shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
//         {message && <p className="text-red-500 text-center mb-4">{message}</p>}

//         {stage === "phone" && (
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSendOtp();
//             }}
//             className="space-y-4"
//           >
//             <div>
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="mt-1 bg-gray-800 border-gray-700 text-white"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </Button>
//           </form>
//         )}

//         {stage === "otp" && (
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleVerifyOtp();
//             }}
//             className="space-y-4"
//           >
//             <div>
//               <Label htmlFor="otp">OTP</Label>
//               <Input
//                 id="otp"
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="mt-1 bg-gray-800 border-gray-700 text-white"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
//             >
//               {loading ? "Verifying OTP..." : "Verify OTP"}
//             </Button>
//           </form>
//         )}

//         {stage === "reset" && (
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleResetPassword();
//             }}
//             className="space-y-4"
//           >
//             <div>
//               <Label htmlFor="newPassword">New Password</Label>
//               <Input
//                 id="newPassword"
//                 type="password"
//                 placeholder="********"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="mt-1 bg-gray-800 border-gray-700 text-white"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2"
//             >
//               {loading ? "Resetting Password..." : "Reset Password"}
//             </Button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Forgotpassword;