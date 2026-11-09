# ==============================================================
# ROOT MODULE: CHHATH WISHES INFRASTRUCTURE
# Author: Gunjan Kumar Gaurav (Senior Cloud & DevSecOps Consultant)
# ==============================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90.0"
    }
  }
}

provider "azurerm" {
  features {}
}

module "chhath_static_site" {
  source = "./modules/azure_static_web_app"

  create_resource_group = var.create_resource_group
  resource_group_name   = var.resource_group_name
  location              = var.location
  app_name              = var.app_name
  sku_tier              = var.sku_tier
  sku_size              = var.sku_size
  environment           = var.environment

  tags = {
    Owner       = "Gunjan Kumar Gaurav"
    Application = "Chhath-Wishes-2026"
    Role        = "Festive Greeting Engine"
    ManagedBy   = "Terraform"
  }
}

