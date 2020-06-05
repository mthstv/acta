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

const useStyles = makeStyles({
    root: {
        marginBottom: '20px',
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pendingRequest: {
        backgroundColor: 'yellow',
    },
    acceptedRequest: {
        backgroundColor: 'green',
    },
    rejectedRequest: {
      backgroundColor: 'red',
    },
    pos: {
        marginBottom: 12,
    },
  });

function RequestList (props) {
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
        await setRequests(res.data.data)
        await setLoaded(true)
      })
  }

  return (
    <>
      <div>
        {requests.length > 0 && requests.map((item, index) =>
          <Row key={item.id}>
            <Col md={12}>
            <Fade 
              in={loaded}
              style={{ transformOrigin: '0 0 0' }}
              {...(loaded ? { timeout: (1000 * (index + 0.5))  } : {})}>
              <div>
                <Card className={classes.root}>
                <CardHeader
                    className={classes.pendingRequest}
                    // title="Shrimp and Chorizo Paella"
                    // subheader="September 14, 2016"
                />
                    <CardContent>
                        <Typography variant="h5" component="h5">
                            Art. 3º - A lei excepcional ou temporária, embora decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, aplica-se ao fato praticado durante sua vigência.
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Código Penal
                        </Typography>
                        <Typography variant="body2" component="p">
                            Avaliado por: Admin / Avaliação pendente
                        </Typography>
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