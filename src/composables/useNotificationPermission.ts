import { ref, type Ref } from 'vue';

export function useNotificationPermission(): Readonly<
  Ref<NotificationPermission>
> {
  const notificationPermission = ref<NotificationPermission>('default');

  Notification.requestPermission((permission) => {
    notificationPermission.value = permission;
  });

  return notificationPermission;
}
