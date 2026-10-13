import React, {Component} from 'react';

export class ErrorBoundary extends Component{
  state={hasError:false};
  static getDerivedStateFromError(){return {hasError:true};}
  componentDidCatch(error,info){console.error('NOVEX PROJECT boundary:',error,info);}
  render(){
    if(this.state.hasError){
      return <div className="error-boundary"><h2>Что-то пошло не так</h2><p>Обнови страницу или попробуй позже.</p><button onClick={()=>window.location.reload()} className="play-btn">Обновить</button></div>;
    }
    return this.props.children;
  }
}
