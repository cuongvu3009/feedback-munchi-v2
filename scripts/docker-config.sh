# Verify Project Existence
gcloud projects describe munchi-feedback-manager

# Verify Permission
gcloud projects get-iam-policy munchi-feedback-manager

# Service activation
gcloud services enable artifactregistry.googleapis.com
gcloud auth configure-docker europe-north1-docker.pkg.dev/munchioy-backend/docker-containers/munchi-feedback-manager