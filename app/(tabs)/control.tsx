import ListItemsButton from "@/components/dev/list-items-button";
import ListUserItemsButton from "@/components/dev/list-user-items.button";
import ListUsersButton from "@/components/dev/list-users-button";
import { ThemedView } from "@/components/themed-view";
import { LayoutStyling } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ThemedView style={LayoutStyling.top}>
      <ListUsersButton />
      <ListItemsButton />
      <ListUserItemsButton />
    </ThemedView>
  );
}
