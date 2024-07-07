const ErrorMessage = {
    LIMIT_EXCEEDED: "limit_exceeded",
    INVALID_PARAMS: "invalid_params",
    NO_ACTIVE_SUBSCRIPTION: "no_active_subscription",
};

const CurrentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

const TomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

const JWT_TOKEN_SECRET_KEY = "Xf55zlZJbB2AdrC";

const UUID_REGEX_PATTERN = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

const SubscriptionPlans = {
    FREE: 'free',
    STUDENT: 'student',
    CLUB: 'club'
};

module.exports = {
    ErrorMessage,
    CurrentDate,
    TomorrowDate,
    JWT_TOKEN_SECRET_KEY,
    UUID_REGEX_PATTERN,
    SubscriptionPlans
};