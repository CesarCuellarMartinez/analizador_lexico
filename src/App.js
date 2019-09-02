import React, {Component} from 'react';
import {
  Button,
  Paper,
  TextareaAutosize,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AppBar
} from "@material-ui/core";

import './App.css';
const re = /(?<operador_condicional>.+\?.+:.+)|(?<igualdad>!=|==)|(?<asignacion_lambda>=>|-=|\+=|\*=|\/=|%=|&=|\|=|\^=|<<=|>>=|=>|=)|(?<principal>new|typeof|checked|unchecked|default|nameof|delegate|sizeof|stackalloc|->|\.|\?\.|\+\+x|\+\+y|--x|--y|x\?\[y\]|f\(x\)|a\[i\])|(?<suma>x\+y|x-y)|(?<and>x&y|y&x)|(?<multiplicativo>x\*y|y\*x|\/|%)|(?<unario>true|and|false|await|!|\+|&x|&y|\*|(T)|x\+\+|y\+\+|y--|x--|-|~)|(?<and_condicional>&&)|(?<or_condicional>\|\|)|(?<xor>\^)|(?<null_condicional>\?\?)|(?<salto><<|>>)|(?<comprobacion_tipos_relaciones>is|as|>|<|<=|>=)|(?<secuencias_escape>\\n|\\t|\\r|\\\\|\\")|(?<or>\|)/g;
class App extends Component {
  constructor(props){
    super(props);
    this.state ={tokens: [],
                 texto: ''};
  }
  handleTexto =(event)=>{
    this.setState({texto:event.target.value})
  }
  analizarTexto =()=>{
    var input = this.state.texto;
    var _tokens =[];
    let result;
    //COMENTAR ESTO PARA ENTENDER DESPUES!!!!!!!
    while (result = re.exec(input)) {
      Object.keys(result.groups).forEach(key => {
        if (result.groups[key] === undefined) {
          delete result.groups[key];
        }
      });
      _tokens.push({
        'tipo':Object.keys(result.groups)[0],
        'valor':result[0],
        'index': result.index,
        'lastIndex': re.lastIndex,
      });
      console.log(result);
    }
    this.setState({tokens:_tokens});
  }
  render(){
    return (
      <Paper style={styles.root}>
         <AppBar>ANALIZADOR LEXICO</AppBar>
        <TextareaAutosize value={this.state.texto} onChange={this.handleTexto} cols='80' rows='20'></TextareaAutosize>
        <Button onClick={this.analizarTexto} color="primary" variant="outlined">Analizar</Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>index</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Inicio</TableCell>
              <TableCell>Fin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            this.state.tokens.map(function(item, i){
              return (
                <TableRow key={i}>
                  <TableCell>{i}</TableCell>
                  <TableCell>{item.valor}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{item.index}</TableCell>
                  <TableCell>{item.lastIndex}</TableCell>
                </TableRow>
              )
              })
            }
          </TableBody>
        </Table>
        
      </Paper>
    );
  }
}
const styles = {
  root:{
    margin:20,
    padding:30,
  },
}
export default App;
