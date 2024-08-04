"use client"
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'

import {Box, Typography, Modal, Stack, TextField, Button, List} from '@mui/material'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

import * as React from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  
  
  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  
const columns = [
  {
   name: "name",
   label: "Name",
   options: {
    filter: true,
    sort: true,
    setCellHeaderProps: () => { return { align:"left", style: {borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
      borderBottom: '2px solid #5C4033'}} },
    setCellProps: () => { return { align:"left", style: {borderRight: '2px solid #D3D3D3', borderTop: '2px solid #5C4033', borderLeft: '2px solid #D3D3D3',
      borderBottom: '2px solid #D3D3D3'}} },
    //setCellProps: value => ({ style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
    //borderBottom: '2px solid #5C4033', fontWeight:"bold"
    //} }),
    //setCellHeaderProps: value => ({style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
    //borderBottom: '2px solid #5C4033', fontWeight:"bold"
    //} }),
   },
   
  },
  {
   name: "quantity",
   label: "Quantity",
   options: {
    filter: true,
    sort: false,
    setCellHeaderProps: () => { return { align:"center", style: {borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
      borderBottom: '2px solid #5C4033'}} },
    setCellProps: () => { return { align:"center", style: {borderRight: '2px solid #D3D3D3', borderTop: '2px solid #5C4033', borderLeft: '2px solid #D3D3D3',
      borderBottom: '2px solid #D3D3D3'}} },
    //setCellProps: value => ({ style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
      //borderBottom: '2px solid #5C4033'
      //} }),
      //setCellHeaderProps: value => ({style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
      //borderBottom: '2px solid #5C4033'
      //} }),
     
   }
  
  },
  {
    name: "Add",
    options: {
      filter: false,
      sort: false,
      setCellHeaderProps: () => { return { align:"center", style: {borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
        borderBottom: '2px solid #5C4033'}} },
      setCellProps: () => { return { align:"center", style: {borderRight: '2px solid #D3D3D3', borderTop: '2px solid #5C4033', borderLeft: '2px solid #D3D3D3',
        borderBottom: '2px solid #D3D3D3'}} },
      //setCellProps: value => ({ style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
        //borderBottom: '2px solid #5C4033'
      //} }),
      //setCellHeaderProps: value => ({ style: {borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
        //borderBottom: '2px solid #5C4033'
      //} }),
      customBodyRender: (value, tableMeta) => {
        const nameOfCurrentRow = tableMeta.rowData[0]; // Assuming "Name" is the first column
        return (
          <Button variant="contained" onClick={() => {
            addItem(nameOfCurrentRow);
          } }>
            +
          </Button>
        );
      },
    },
  },
  {
    name: "Remove",
    options: {
      filter: false,
      sort: false,
      setCellHeaderProps: () => { return { align:"center", style: {borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
        borderBottom: '2px solid #5C4033'}} },
      setCellProps: () => { return { align:"center", style: {borderRight: '2px solid #D3D3D3', borderTop: '2px solid #5C4033', borderLeft: '2px solid #D3D3D3',
        borderBottom: '2px solid #D3D3D3'}} },
      //setCellProps: value => ({ style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
       // borderBottom: '2px solid #5C4033'
      //} }),
      //setCellHeaderProps: value => ({ style: { borderRight: '2px solid #5C4033', borderTop: '2px solid #5C4033', borderLeft: '2px solid #5C4033',
        //borderBottom: '2px solid #5C4033'
      //} }),
      customBodyRender: (value, tableMeta) => {
        const nameOfCurrentRow = tableMeta.rowData[0]; // Assuming "Name" is the first column
        return (
          <Button variant="contained" onClick={() => {
            removeItem(nameOfCurrentRow);
          } }>
            -
          </Button>
        );
      },
    },
  },
 ];
 
 let data1 = inventory.map(function ({name, quantity}) {
  return [name, quantity];
})
 const data = data1;

 
 const options = {
  selectableRows: false, // This will turn off checkboxes in rows
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 6],
  responsive: 'scrollFullHeight'
  
};

// Resources: 
//https://stackoverflow.com/questions/66680593/react-mui-datatables-change-header-color
//components: {  MUIDataTableBodyCell: { styleOverrides:{ root: { backgroundColor: "#FF0000"} } } }
//https://github.com/gregnb/mui-datatables/issues/400
//https://github.com/gregnb/mui-datatables/issues/1254

const theme = createTheme({
  palette: {
    primary: {
      main:"#FFB22C",
      contrastText: "#fff"},//"#FFBF78"},
      
    secondary: {
      main:"#ECB159",//"#FFC7ED"//"#E0A75E"
    }
  },
  components: {  

    MUIDataTableToolbar: {
      styleOverrides:{
			root: {
        backgroundColor:  "#F96666",//"#C38154",//"#FEB941",//"#FF4C4C",
        fontStyle: "italic",
        fontWeight: "bold",
        textDecoration: 'underline'
			}}
		},
    MUIDataTableHeadCell: {
    styleOverrides:{
      root: {
          backgroundColor: "#9BEC00",
          color: "white",
          
      }
      
    }
  },
  MUIDataTableBodyCell: {
    styleOverrides:{
      root: {
          backgroundColor:"#FAFFAF",//"#ffdbaf",//"#FEFFD2",
          boxSizing: 'border-box',
          fontWeight: "bold",
      }
      
    }
  },

  MuiTableFooter: {
    styleOverrides:{
      root: {
          backgroundColor: "#F96666",//"#C38154",//"#FEB941",//"#FF4C4C",
          alignContent: "center", // used for respinsive design, keep everything center aligned even when window is minimized,
          fontStyle: "italic",
          
      }
    }
  },
 
}   
});

  return (
    <ThemeProvider theme={theme}>
    <Box
    width="100vw"
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    flexDirection={"column"}
    bgcolor="wheat"
    position={"absolute"}
    >
      <Image
      //style={{ objectFit: "cover"}}
        fill
        src={'/food.jpg'}
        alt="Image alt"
        style={{ objectFit: "cover"}}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{transform:"translate(-50%,-50%)"}}
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display='flex'
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}>
          <Typography variant="h6">Enter the Name of the Item Below:</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant="outlined"
            fullWidth Value={itemName}
            onChange={(e)=>{setItemName(e.target.value)}}>

            </TextField>
            <Button
            variant="outlined"
            onClick={()=>{
              addItem(itemName)
              setItemName('')
              handleClose()}}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      
      <MUIDataTable
        title={"Pantry List"}
        data={data}
        columns={columns}
        options={options}
      />
     
     <Button
      variant="contained"
      onClick={()=>{handleOpen()}}
      color="secondary"
      sx={{ fontWeight: 'bold', color:'#fff'}}>
        Add a New Item
      </Button>

    </Box>
    </ThemeProvider>
  )

}
