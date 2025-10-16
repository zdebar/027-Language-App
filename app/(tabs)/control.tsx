import ListBlocksButton from "@/components/dev/list-blocks-button";
import ListGrammarButton from "@/components/dev/list-grammar-button";
import ListItemsButton from "@/components/dev/list-items-button";
import ListNextItemsButton from "@/components/dev/list-nextItem-button";
import ListNowButton from "@/components/dev/list-now-button";
import ListTriggersButton from "@/components/dev/list-triggers";
import ListUserItemsButton from "@/components/dev/list-user-items.button";
import ListUserScoreButton from "@/components/dev/list-user-score-button";
import ListUsersButton from "@/components/dev/list-users-button";
import { ThemedView } from "@/components/themed-view";
import { LayoutStyling } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ThemedView style={LayoutStyling.top}>
      <ListUsersButton />
      <ListItemsButton />
      <ListUserItemsButton />
      <ListUserScoreButton />
      <ListBlocksButton />
      <ListGrammarButton />
      <ListTriggersButton />
      <ListNextItemsButton />
      <ListNowButton />
    </ThemedView>
  );
}
