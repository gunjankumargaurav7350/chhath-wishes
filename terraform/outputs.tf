output "website_url" {
  description = "The public URL of the deployed Chhath Wishes site"
  value       = "https://${module.chhath_static_site.default_host_name}"
}

output "resource_group_name" {
  description = "Azure Resource Group hosting the app"
  value       = var.resource_group_name
}

output "deployment_token" {
  description = "Deployment token for GitHub Actions / CI/CD pipeline"
  value       = module.chhath_static_site.api_key
  sensitive   = true
}
