# ==============================================================
# MODULE: AZURE STATIC WEB APP FOR CHHATH WISHES
# ==============================================================

resource "azurerm_resource_group" "rg" {
  count    = var.create_resource_group ? 1 : 0
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

locals {
  rg_name     = var.create_resource_group ? azurerm_resource_group.rg[0].name : var.resource_group_name
  rg_location = var.create_resource_group ? azurerm_resource_group.rg[0].location : var.location
}

resource "azurerm_static_web_app" "static_site" {
  name                = var.app_name
  resource_group_name = local.rg_name
  location            = local.rg_location
  sku_tier            = var.sku_tier
  sku_size            = var.sku_size

  tags = merge(var.tags, {
    Project     = "Chhath-Wishes"
    ManagedBy   = "Terraform"
    Environment = var.environment
  })
}
