import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { FloatingLabel, Form } from "react-bootstrap";

export function Search({ actualRoute }) {
  const query = useQuery();
  const search = query.get("search");

  const [searchText, setsearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setsearchText(search !== null ? search : "");
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${actualRoute}?search=${searchText}`);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <FloatingLabel controlId="floatingSearch" label="Search...">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setsearchText(value);
              navigate(`/${actualRoute}?search=${value}`);
            }}
          />
        </FloatingLabel>
      </Form.Group>
    </Form>
  );
}
