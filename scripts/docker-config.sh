# Verify Project Existence
gcloud projects describe munchioy-backend

# Verify Permission
gcloud projects get-iam-policy munchioy-backend

# Make sure you are using correct account
gcloud auth list

# Change to correct account
gcloud config set account cuong@gomunchi.com

# Each account gonna have corresponding project
gcloud projects list

# Switch to intended project core project (project_id: 725286455441)
gcloud config set project munchioy-backend

# Service activation
gcloud services enable artifactregistry.googleapis.com

# Config docker
gcloud auth configure-docker europe-north1-docker.pkg.dev/munchioy-backend/docker-containers/munchi-feedback-manager

# Grant permission:
gcloud projects add-iam-policy-binding munchioy-backend \
  --member=user:cuong@gomunchi.com \
  --role=roles/storage.admin

gcloud projects add-iam-policy-binding munchioy-backend \
  --member=user:cuong@gomunchi.com \
  --role=roles/artifactregistry.repositories.uploadArtifacts

# Update google cloud sdk
gcloud components update

# Now set the condition separately for permission:
gcloud resource-manager org-policies set-policy constraints/artifactregistry.repositories.uploadArtifacts \
  --project=munchioy-backend \
  --policy=resource.spec.repositories[0].name="projects/munchioy-backend/locations/europe-north1/repositories/munchi-feedback-manager"

# Verify Permissions on the Artifact Registry Repository: 
gcloud artifacts repositories describe europe-north1-docker.pkg.dev/munchioy-backend/docker-containers/munchi-feedback-manager \
  --location=europe-north1

# Build the Docker Image:
docker build -t munchi-feedback-manager:latest .

# Tag the Docker Image:
docker tag munchi-feedback-manager:latest europe-north1.pkg.dev/munchioy-backend/docker-containers/munchi-feedback-manager:latest

# Push the Docker Image:
docker push europe-north1.pkg.dev/munchioy-backend/docker-containers/munchi-feedback-manager:latest

