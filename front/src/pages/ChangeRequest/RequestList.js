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
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        marginBottom: '20px',
        minWidth: 275,
    },
    opaqueRoot: {
      marginBottom: '20px',
      minWidth: 275,
      opacity: 0.3
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
    oldTextExpanded: {
      backgroundColor: red[100], 
      marginBottom: '16px'
    },
    newTextExpanded: {
      backgroundColor: green[100], 
      marginBottom: '8px'
    },
    addRemoveIconBg: {
      backgroundColor: '#dedede'
    },
    createdBy: {
      textAlign: 'right'
    },
    acceptButton: {
      backgroundColor: green[500],
      color: 'white', 
      marginRight: '8px',
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    acceptButtonDisabled: {
      backgroundColor: green[200], 
      color: 'white', 
      marginRight: '8px'
    },
    rejectButton: {
      backgroundColor: red[500],
      color: 'white',
      "&:hover": {
        backgroundColor: red[700]
      }
    },    
    rejectButtonDisabled: {
      backgroundColor: red[200], 
      color: 'white'
    },
    progress: {
      color: 'white'
    },
    noRequestsText: {
      textAlign: "center", 
      color: "white"
    }
});

function RequestList (props) {
  const Diff = require('diff');
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [reviewLoading, setReviewLoading] = useState({ requestId: null, accept: false, reject: false })
  const [expanded, setExpanded] = useState([])
  const classes = useStyles();

  useEffect(() => {
    getRequests()
  },[])

  const getRequests = () => {
    setRequests([])
    setLoaded(false)

    api.get("/change-request")
      .then(async (res) => {
        res.data.data.forEach(request => {
          let newDate = new Date(request.created_at);
          request.formatted_created_at = newDate.toLocaleDateString();

          if(request.reviewed_at) {
            let newDate = new Date(request.reviewed_at);
            request.formatted_reviewed_at = newDate.toLocaleDateString();
          }

          request.changes = [];
          let diff = Diff.diffWords(request.old_text, request.new_text);
          diff.forEach((part) => {
            const bgColor = part.added ? green[200] : part.removed ? red[200] : 'white';
            request.changes.push({ part, bgColor})
          });

        })
    
        await setRequests(res.data.data)
        await setLoaded(true)
      })
  }
  
  const handleExpandButton = (requestId) => {
    if(expanded.includes(requestId)) {
      let filteredExpanded = expanded.filter((id) => {
        return id !== requestId
      })
      setExpanded(filteredExpanded);
    } else {
      setExpanded([...expanded, requestId]);
    }
  }

  const handleReview = (requestId, accepted) => {
    setReviewLoading({ requestId, accept: accepted, reject: !accepted })
    const payload = {
      admin: user.id,
      status: accepted ? 'ACCEPTED' : 'REJECTED'
    }
      api.patch(`/change-request/review/${requestId}`, payload)
        .then(res => {
          dispatch({type: 'SNACKBAR_SHOW', message: `Solicitação avaliada com sucesso`})
          setReviewLoading({ requestId: null, accept: false, reject: false })
          getRequests()
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
                    {expanded.includes(request.id) ? 
                      <>
                        {/* Expanded view */}
                        <Typography color="textSecondary">
                          Texto atual
                        </Typography>
                        <Typography variant="h6" component="h6" className={classes.oldTextExpanded}>
                          {request.old_text}
                        </Typography>
                        <Typography color="textSecondary">
                          Mudança sugerida
                        </Typography>
                        <Typography variant="h6" component="h6" className={classes.newTextExpanded}>
                          {request.new_text}
                        </Typography>
                      </>
                    : 
                      <>
                      {/* Mix and match old and new text */}
                        <Typography variant="h6" component="h6">
                            {request.changes.map((change, index) => 
                              <span key={index} style={{backgroundColor: change.bgColor}}>
                                <em className={classes.addRemoveIconBg}>
                                  {change.part.added ? '+ ' : change.part.removed ? '- ' : ''}
                                </em>
                                {change.part.value}
                              </span>
                            )}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {request.rule_title}
                        </Typography>
                      </>
                    }
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          {/* Reviewed by */}
                          <Typography variant="body2" component="p">
                            {request.admin ? `Avaliado por ${request.admin.name} em ${request.formatted_reviewed_at}`: 'Avaliação pendente' }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {/* Created by */}
                          <Typography variant="body2" component="p" className={classes.createdBy}>
                            Criado {user.is_admin && `por ${request.consultant.name} `} em {request.formatted_created_at}
                          </Typography>
                        </Grid>
                      </Grid>
                  </CardContent>
                  {!request.reviewed_at && user.is_admin && 
                    <CardActions>
                        <Grid container justify="space-between" spacing={10}>
                          {/* Expand Button */}
                          <Grid item>
                            <Button size="small" onClick={() => handleExpandButton(request.id)}>{expanded.includes(request.id) ? 'Retrair' : 'Expandir'}</Button>
                          </Grid>
                          {/* Review Buttons */}
                          <Grid item>
                            <Button 
                              size="small" 
                              className={reviewLoading.requestId === request.id && (reviewLoading.reject || reviewLoading.accept) ? classes.acceptButtonDisabled : classes.acceptButton} 
                              onClick={() => handleReview(request.id, true)}
                              disabled={reviewLoading.requestId === request.id && (reviewLoading.reject || reviewLoading.accept)}>
                                {reviewLoading.requestId === request.id && reviewLoading.accept ? 
                                  <CircularProgress size={24} className={classes.progress}/>
                                  :
                                  'Aceitar'
                                }
                            </Button>
                            <Button 
                              size="small"
                              className={reviewLoading.requestId === request.id && (reviewLoading.reject || reviewLoading.accept) ? classes.rejectButtonDisabled : classes.rejectButton}
                              onClick={() => handleReview(request.id, false)}
                              disabled={reviewLoading.requestId === request.id && (reviewLoading.reject || reviewLoading.accept)}>
                                {reviewLoading.requestId === request.id && reviewLoading.reject ? 
                                    <CircularProgress size={24} className={classes.progress}/>
                                    :
                                    'Recusar'
                                }
                            </Button>
                          </Grid>
                        </Grid>
                    </CardActions>
                  }
                  {!request.reviewed_at &&  user.is_consultant && 
                    <CardActions>
                        <Button size="small" >Alterar</Button>
                    </CardActions>
                  }
                </Card>
              </div>
            </Fade>
            </Col>
          </Row>
        )}
        {loaded && requests.length === 0 ?
          <div className={classes.noRequestsText}>
            Nenhuma solicitação encontrada
          </div>
          :""}
      </div>
    </>
  );
}

export default RequestList;