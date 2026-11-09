variable "create_resource_group" {
  description = "Whether to create a new resource group"
  type        = bool
  default     = true
}

variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
}

variable "location" {
  description = "Azure region to deploy resources (e.g., centralindia, eastus2)"
  type        = string
  default     = "centralindia"
}

variable "app_name" {
  description = "Name of the Static Web App"
  type        = string
  default     = "chhath-wishes-web"
}

variable "sku_tier" {
  description = "SKU Tier: Free or Standard"
  type        = string
  default     = "Free"
}

variable "sku_size" {
  description = "SKU Size: Free or Standard"
  type        = string
  default     = "Free"
}

variable "environment" {
  description = "Environment name (prod, dev, staging)"
  type        = string
  default     = "prod"
}

variable "tags" {
  description = "Tags to assign to resources"
  type        = map(string)
  default     = {}
}
