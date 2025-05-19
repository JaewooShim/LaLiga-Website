ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-east-1" 
REPO_URL="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

create_repo_if_not_exists() {
    local repo=$1
    aws ecr describe-repositories --repository-names "$repo" --region "$REGION" >/dev/null 2>&1
    if [ $? -ne 0 ]; then
        aws ecr create-repository --repository-name "$repo" --region "$REGION"
    else
        echo "$repo already exists"
    fi
}

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPO_URL


# create repos for services
create_repo_if_not_exists backend
create_repo_if_not_exists frontend
create_repo_if_not_exists scraper
create_repo_if_not_exists soccer-db

docker build -t backend:latest ./backend
docker tag backend $REPO_URL/backend:latest
docker push $REPO_URL/backend:latest

docker build -t frontend:latest ./frontend/soccer-webpage
docker tag frontend $REPO_URL/frontend:latest
docker push $REPO_URL/frontend:latest

docker build -t scraper:latest ./scraper
docker tag scraper $REPO_URL/scraper:latest
docker push $REPO_URL/scraper:latest

docker build -t soccer-db:latest ./db
docker tag soccer-db:latest $REPO_URL/soccer-db:latest
docker push $REPO_URL/soccer-db:latest