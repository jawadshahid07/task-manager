build-project:
	cd task_manager_app && npm run build && cd ..

deploy-infra:
	terraform apply -auto-approve

deploy-site:
	cd task_manager_app && npm run build && aws s3 sync ./build s3://my-task-management-app-2024