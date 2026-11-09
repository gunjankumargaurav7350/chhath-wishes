output "static_web_app_id" {
  description = "The ID of the Static Web App"
  value       = azurerm_static_site.static_site.id
}

output "default_host_name" {
  description = "The default URL hostname of the Static Web App"
  value       = azurerm_static_site.static_site.default_host_name
}

output "api_key" {
  description = "API key for deployment token"
  value       = azurerm_static_site.static_site.api_key
  sensitive   = true
}
