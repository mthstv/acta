import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from "react-bootstrap";
import api from "../../services/api";
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
// import Diff from 'diff';

const useStyles = makeStyles({
    root: {
        marginBottom: '20px',
        minWidth: 275,
    },
    opaqueRoot: {
      marginBottom: '20px',
      minWidth: 275,
      opacity: 0.6
    },
    pendingRequest: {
        backgroundColor: yellow[500],
    },
    acceptedRequest: {
        backgroundColor: green[500],
    },
    rejectedRequest: {
      backgroundColor: red[500],
    },
    pos: {
        marginBottom: 12,
    },
});

function RequestList (props) {
  const Diff = require('diff');
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([])
  const [loaded, setLoaded] = useState(false)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {
    getRequests();
  },[])

  const getRequests = () => {
    api.get("/change-request")
      .then(async (res) => {
        
        res.data.data.map(request => {
          let newDate = new Date(request.created_at);
          request.formatted_created_at = newDate.toLocaleDateString();
          if(request.reviewed_at) {
            let newDate = new Date(request.reviewed_at);
            request.formatted_reviewed_at = newDate.toLocaleDateString();
          }
          let diff = Diff.diffChars(request.old_text, request.new_text);
          diff.forEach((part) => {
            // green for additions, red for deletions
            // grey for common parts
            const color = part.added ? 'green' :
              part.removed ? 'red' : 'black';
            request.changes = { part, color }
            console.log(request.changes);
            // process.stderr.write(part.value[color]);
          });
        })
        await setRequests(res.data.data)
        await setLoaded(true)
        console.log(res.data.data);
      })
  }

  return (
    <>
      <div>
        {requests.length > 0 && requests.map((request, index) =>
          <Row key={request.id}>
            <Col md={12}>
            <Fade 
              in={loaded}
              style={{ transformOrigin: '0 0 0' }}
              {...(loaded ? { timeout: (1000 * (index + 0.5))  } : {})}>
              <div>
                <Card className={request.status === 'PENDING' ? classes.root : classes.opaqueRoot}>
                {request.status === 'PENDING' && <CardHeader className={classes.pendingRequest}/> }
                {request.status === 'ACCEPTED' && <CardHeader className={classes.acceptedRequest}/> }
                {request.status === 'REJECTED' && <CardHeader className={classes.rejectedRequest}/> }
                  <CardContent>
                      <Typography variant="h6" component="h6">
                          {request.change}
                          {/* Art. 3º - A lei excepcional ou temporária, embora decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, aplica-se ao fato praticado durante sua vigência. */}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                          Código Penal
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography variant="body2" component="p">
                            {request.admin ? `Avaliado por: ${request.admin.name}`: 'Avaliação pendente' }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" component="p" style={{textAlign: 'right'}}>
                            {request.reviewed_at ? `Avaliado em : ${request.formatted_reviewed_at}`: `Criado em : ${request.formatted_created_at}`}
                          </Typography>
                        </Grid>
                      </Grid>
                  </CardContent>
                  <CardActions>
                      <Button size="small">Abrir</Button>
                  </CardActions>
                </Card>
              </div>
            </Fade>
            </Col>
          </Row>
        )}
        {loaded && requests.length === 0 ?
          <div style={{textAlign: "center", color: "white"}}>
            Nenhuma solicitação encontrada
          </div>
          :""}
      </div>
    </>
  );
}

export default RequestList;