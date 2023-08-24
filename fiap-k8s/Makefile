delete-stack:
	kubectl delete -f mongodb-statefulset.yaml
	kubectl delete -f mongodb-svc.yaml
	kubectl delete -f mongodb-init-cm.yaml
	kubectl delete -f app-deployment.yaml
	kubectl delete -f mongodb-secrets.yaml

create-stack:
	kubectl apply -f mongodb-secrets.yaml
	kubectl apply -f mongodb-init-cm.yaml
	kubectl apply -f mongodb-statefulset.yaml
	kubectl apply -f mongodb-svc.yaml
	kubectl apply -f app-deployment.yaml
	
port-forward:
	kubectl port-forward deployment/fiap-application 8080:8080