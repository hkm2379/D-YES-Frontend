import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ToggleComponent from "../productOption/ToggleComponent";
import FarmSearch from "../productOption/FarmSearch";
import { Farm } from "page/farm/entity/farm/Farm";
import "../../css/ProductPage.css";
import useProductRegisterStore from "page/product/store/ProductRegisterStore";

const ProductDetailRegister = () => {
  // Zustand 스토어로부터 필요한 상태와 함수를 가져옴
  const { products, setProducts } = useProductRegisterStore();
  const [selectedFarmName, setSelectedFarmName] = React.useState("");
  const [openFarmSearch, setOpenFarmSearch] = React.useState(false);

  const handleOpenFarmSearch = () => {
    setOpenFarmSearch(true);
  };

  const handleFarmSelect = (selectedFarm: Farm) => {
    const newFarmName = selectedFarm.farmName;
    setSelectedFarmName(newFarmName);
    setOpenFarmSearch(false);
    setProducts({ ...products, farmName: newFarmName });
  };

  const options = [
    { value: "PESTICIDE_FREE", label: "무농약" },
    { value: "ENVIRONMENT_FRIENDLY", label: "친환경" },
    { value: "ORGANIC", label: "유기농" },
  ];

  const produceTypesOptions = [
    { value: "POTATO", label: "감자" },
    { value: "SWEET_POTATO", label: "고구마" },
    { value: "CABBAGE", label: "양배추" },
    { value: "KIMCHI_CABBAGE", label: "배추" },
    { value: "LEAF_LETTUCE", label: "상추" },
    { value: "ROMAINE_LETTUCE", label: "로메인 상추" },
    { value: "PEPPER", label: "고추" },
    { value: "GARLIC", label: "마늘" },
    { value: "TOMATO", label: "토마토" },
    { value: "CUCUMBER", label: "오이" },
    { value: "CARROT", label: "당근" },
    { value: "EGGPLANT", label: "가지" },
    { value: "ONION", label: "양파" },
    { value: "YOUNG_PUMPKIN", label: "애호박" },
    { value: "WELSH_ONION", label: "대파" },
  ];

  const handleOptionChange = (event: SelectChangeEvent<{ value: string; label: string }>) => {
    setProducts({ ...products, cultivationMethod: event.target.value.toString() });
  };

  const handleProduceTypesChange = (event: SelectChangeEvent<{ value: string; label: string }>) => {
    setProducts({ ...products, produceType: event.target.value.toString() });
  };

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProductName = event.target.value;
    setProducts({ ...products, productName: newProductName });
  };

  return (
    <div className="product-register-container">
      <Container maxWidth="md" sx={{ marginTop: "2em", display: "flex" }}>
        <div>
          <ToggleComponent label="기본정보" height={200}>
            <Box display="flex" flexDirection="column" gap={2}>
              <div className="text-field-container">
                <div className="text-field-label" aria-label="상품명*">
                  상품명*
                </div>
                <TextField
                  name="productName"
                  className="text-field-input"
                  size="small"
                  value={products.productName}
                  onChange={handleProductNameChange}
                />
              </div>
              <div className="text-field-container">
                <div className="text-field-label">재배방식*</div>
                <FormControl
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Select
                    name="cultivationMethod"
                    value={
                      (products.cultivationMethod as "" | { value: string; label: string }) || ""
                    }
                    onChange={handleOptionChange}
                    className="text-field"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <MenuItem value="">옵션을 선택해주세요</MenuItem>
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="text-field-container">
                <div className="text-field-label">농가 이름*</div>
                <TextField
                  name="farmName"
                  className="text-field-input"
                  size="small"
                  value={products.farmName}
                  onChange={(event) => {
                    setSelectedFarmName(event.target.value);
                  }}
                />
                <Button onClick={handleOpenFarmSearch}>조회</Button>
                <FarmSearch
                  open={openFarmSearch}
                  onClose={() => setOpenFarmSearch(false)}
                  selectedFarmName={selectedFarmName}
                  onSelectFarm={handleFarmSelect}
                />
              </div>
              <div className="text-field-container">
                <div className="text-field-label">농산물*</div>
                <FormControl
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Select
                    name="produceType"
                    value={
                      (products.produceType as "" | { value: string; label: string }) || ""
                    }
                    onChange={handleProduceTypesChange}
                    className="text-field"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <MenuItem value="">판매상품을 선택해주세요</MenuItem>
                    {produceTypesOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
          </ToggleComponent>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailRegister;
