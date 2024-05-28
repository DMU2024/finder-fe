import { makeStyles } from "@fluentui/react-components";

import SearchForm from "../components/Search/SearchForm";
import SearchList from "../components/Search/SearchList";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }
});

function SearchPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <SearchForm />
      <SearchList />
    </div>
  );
}

export default SearchPage;
