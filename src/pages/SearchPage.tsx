import { makeStyles } from "@fluentui/react-components";

import SearchForm from "../components/Search/SearchForm";
import SearchList from "../components/Search/SearchList";
import { contentMargin, headerHeight } from "../styles/margin";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`
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
