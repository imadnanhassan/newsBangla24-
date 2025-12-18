"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface AlertMessage {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

// Re-export toast for convenience
export { toast };

export interface UserPermissions {
  canDelete: boolean;
  canEdit: boolean;
  canCreate: boolean;
  role: "admin" | "editor" | "viewer";
}

export interface DeleteConfig {
  itemName: string;
  itemType: string;
  additionalInfo?: string;
  onConfirm: () => void | Promise<void>;
}

export function useAdminActions() {
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState<DeleteConfig | null>(null);

  // Mock user permissions - in a real app, this would come from auth context
  const userPermissions: UserPermissions = {
    canDelete: true, // Mock: user has delete permissions
    canEdit: true,
    canCreate: true,
    role: "admin",
  };

  const showAlert = (alertMessage: AlertMessage) => {
    switch (alertMessage.type) {
      case "success":
        toast.success(alertMessage.title, {
          description: alertMessage.message,
        });
        break;
      case "error":
        toast.error(alertMessage.title, {
          description: alertMessage.message,
        });
        break;
      case "warning":
        toast.warning(alertMessage.title, {
          description: alertMessage.message,
        });
        break;
      case "info":
        toast.info(alertMessage.title, {
          description: alertMessage.message,
        });
        break;
    }
  };

  const hideAlert = () => {
    // Sonner handles auto-hide, no need to manually hide
  };

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const confirmDelete = (config: DeleteConfig) => {
    if (!userPermissions.canDelete) {
      showAlert({
        type: "error",
        title: "Permission Denied",
        message: `You don't have permission to delete ${config.itemType}s. Contact your administrator.`,
      });
      return;
    }

    setDeleteConfig(config);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfig) return;

    try {
      startLoading();
      await deleteConfig.onConfirm();

      showAlert({
        type: "success",
        title: "Deleted Successfully",
        message: `${deleteConfig.itemName} has been deleted successfully.`,
      });
    } catch (error) {
      showAlert({
        type: "error",
        title: "Delete Failed",
        message: `Failed to delete ${deleteConfig.itemName}. Please try again.`,
      });
    } finally {
      stopLoading();
      setDeleteModalOpen(false);
      setDeleteConfig(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeleteConfig(null);
  };

  const checkPermission = (action: keyof UserPermissions): boolean => {
    return userPermissions[action] as boolean;
  };

  return {
    // State
    loading,
    deleteModalOpen,
    deleteConfig,
    userPermissions,

    // Actions
    showAlert,
    hideAlert,
    startLoading,
    stopLoading,
    confirmDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
    checkPermission,
  };
}
