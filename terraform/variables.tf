variable "create_resource_group" {
  description = "Set to true to create a new resource group"
  type        = bool
  default     = true
}

variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "rg-chhath-wishes-prod"
}

variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "centralindia"
}

variable "app_name" {
  description = "Name of the Azure Static Web App"
  type        = string
  default     = "gunjan-chhath-wishes-2026"
}

variable "sku_tier" {
  description = "Pricing tier for Static Web App (Free or Standard)"
  type        = string
  default     = "Free"
}

variable "sku_size" {
  description = "SKU size for Static Web App"
  type        = string
  default     = "Free"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "prod"
}
