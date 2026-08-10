
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    image?: string;
  };
};

export default function ProductReviews({ product }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // GET REVIEWS
  // =========================

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoadingReviews(true);

        const res = await fetch(
          `http://localhost:3001/reviews/product/${product._id}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch reviews",
          );
        }

        setReviews(data.reviews || []);
      } catch (error) {
        console.error("REVIEWS ERROR:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (product._id) {
      getReviews();
    }
  }, [product._id]);

  // =========================
  // ADD REVIEW
  // =========================

  const handleSubmitReview = async () => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Please login first to write a review.");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3001/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            rating,
            comment: comment.trim(),
          }),
        },
      );

      const data = await res.json();

      console.log("ADD REVIEW RESPONSE:", data);

      if (!res.ok) {
        setError(
          data.message ||
            "Failed to add review",
        );
        return;
      }

      // Add the new review to the page
      setReviews((currentReviews) => [
        data.review,
        ...currentReviews,
      ]);

      setRating(0);
      setComment("");

      setSuccess("Review added successfully.");
    } catch (error) {
      console.error("ADD REVIEW ERROR:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16">
      {/* TITLE */}

      <h2 className="mb-3 text-3xl font-bold text-[#8B1E1E]">
        Customer Reviews
      </h2>

      {/* COUNT */}

      <div className="mb-8">
        <p className="text-gray-600">
          {reviews.length} customer reviews
        </p>
      </div>

      {/* =========================
          WRITE REVIEW
      ========================= */}

      <div className="mb-10 rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold text-[#8B1E1E]">
          Write a Review
        </h3>

        {/* STARS */}

        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Your Rating
          </p>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  star <= rating
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* COMMENT */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Your Review
          </label>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your review..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#8B1E1E]"
          />
        </div>

        {/* ERROR */}

        {error && (
          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* SUCCESS */}

        {success && (
          <p className="mt-4 text-sm text-green-600">
            {success}
          </p>
        )}

        {/* SUBMIT */}

        <button
          type="button"
          onClick={handleSubmitReview}
          disabled={loading}
          className="mt-5 rounded-xl bg-[#8B1E1E] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </div>

      {/* =========================
          REVIEWS
      ========================= */}

      {loadingReviews ? (
        <p className="text-gray-500">
          Loading reviews...
        </p>
      ) : reviews.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            No reviews yet. Be the first to review
            this product.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              {/* STARS */}

              <div className="mb-2 text-yellow-500">
                {"★".repeat(review.rating)}
              </div>

              {/* USER */}

              <h3 className="text-lg font-semibold">
                {review.user?.name}
              </h3>

              {/* COMMENT */}

              <p className="mt-3 text-gray-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

