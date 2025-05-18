"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface VerificationData {
  visaID: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

export default function VerificationPage() {
  const [loading, setLoading] = useState(true);
  const [verificationData, setVerificationData] =
    useState<VerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract and decode the base64 data from URL
    const parseUrlData = () => {
      try {
        const encodedData = searchParams.get("data");

        if (!encodedData) {
          throw new Error("No verification data found in URL");
        }

        // Decode base64 data
        const decodedString = atob(encodedData);
        const vcData = JSON.parse(decodedString);

        console.log(vcData);

        // Extract the required fields
        const vc_summary = {
          visaID: vcData.vc_summary.visaID,
          firstName: vcData.vc_summary.firstName,
          lastName: vcData.vc_summary.lastName,
          nationality: vcData.vc_summary.nationality,
        };

        setVerificationData(vc_summary);
      } catch (err) {
        console.error("Error parsing verification data:", err);
        setError(
          "Failed to parse verification data. Please check the URL and try again."
        );
      }
    };

    // Simulate loading delay
    setTimeout(() => {
      parseUrlData();
      setLoading(false);
    }, 2000);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-md p-6">
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <div className="w-12 h-12 border-4 border-t-black border-gray-200 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">
              Verifying credentials...
            </p>
          </div>
        ) : error ? (
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-lg font-semibold mb-2">Verification Error</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 pb-4 border-b border-gray-200">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">Verified</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Visa Information
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Visa ID</p>
                  <p className="font-medium">{verificationData?.visaID}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">
                    {verificationData?.firstName} {verificationData?.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="font-medium">{verificationData?.nationality}</p>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Verification completed on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
