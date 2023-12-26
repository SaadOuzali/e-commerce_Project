import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import request from "./axios";

const CategoriesDisplay = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const data = await request.get("/v1/categories");
        if (data.status === 200) {
          setCategories(data.data.data);
        }
      } catch (error) {
        console.log("hna ferror", error);
      }
    };
    fetchCategorie();
  }, []);

  return (
    <Container sx={{ position: "relative" }}>
      <div
        style={{ maxWidth: 280 }}
        onMouseLeave={handleToggle}
        onMouseEnter={handleToggle}
      >
        <Button
          sx={{
            bgcolor: theme.palette.search.main,
            color: theme.palette.text.secondary,
            width: "250px",
          }}
        >
          Categories
        </Button>
        <List sx={{ display: open ? "block" : "none" }}>
          {categories.map((cat, index) => (
            <ListItem
              onMouseEnter={(e) => e.currentTarget.classList.add(`sub-active`)}
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(`sub-active`)
              }
              key={cat.id}
              disablePadding
              className="category-wrapper"
              // sx={{ position: "relative" }}
            >
              <ListItemButton
                sx={{
                  bgcolor: theme.palette.search.main,
                  color: theme.palette.text.secondary,
                }}
              >
                <ListItemText primary={cat.category_name} />
              </ListItemButton>
              <Box
                className="sub"
                bgcolor={theme.palette.search.main}
                sx={{ position: "absolute", height: 100 }}
                right={"-30%"}
                top={0}
              >
                {cat.sub.map((subcat) => (
                  <Box>
                    <Link color={theme.palette.text.secondary}>
                      
                      {subcat.subcategory_name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
};

export default CategoriesDisplay;
