import React, { useEffect, useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { cpfMask, currencyMask } from '../Mask/index';

const CadastrarPaciente = props => {

    const [cpf, setCpf] = useState("");
    const [currency, setCurrency] = useState("");
    const [dateColor, setDateColor] = useState("form-control input nascimento");

    useEffect(() => {
        props.setPageTitle("Cadastrar Paciente");
    });

    const handleCpf = e => {
        setCpf(cpfMask(e.target.value));
    }

    const handleCurrency = e => {
        setCurrency(currencyMask(e.target.value));
    }

    const handleDateChage = () => {
        setDateColor("form-control input");
    }

    return(
        <>
        <Row>
            <Col md={{size: 6}}>
                <div className="box">
                    <h1 className="subtitle">
                        Dados do paciente
                    </h1>
                    <Row>
                        <Col md={4}>
                            <label htmlFor="nome">Nome: </label>
                            <input type="text" id="nome" className="form-control input" />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="idade">Idade: </label>
                            <input type="number" id="idade" className="form-control input" />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="telefone-fixo">Telefone Fixo: </label>                                    
                            <input type="text" id="telefone-fixo" className="form-control input" placeholder="DDD + número"/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px'}}>
                        <Col md={4}>
                            <label htmlFor="celular">Celular: </label>
                            <input type="text" id="celular" className="form-control input" placeholder="DDD + número"/>
                        </Col>
                        <Col md={4}>
                            <label htmlFor="cpf">CPF: </label>
                            <input 
                                type="text" 
                                id="cpf" 
                                className="form-control input"
                                onChange={handleCpf} 
                                maxLength="14" 
                                placeholder="___.___.___-__" 
                                value={cpf}
                            />
                        </Col>
                        <Col md={4}>
                            <label htmlFor="rg">RG: </label>
                            <input type="text" id="rg" className="form-control input"/>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="data-nascimento">Data de Nascimento: </label>
                            <input 
                                type="date" 
                                id="data-nascimento" 
                                className={dateColor}
                                placeholder="Data de Nascimento" 
                                onChange={handleDateChage}
                                onKeyDown={handleDateChage}
                            />
                        </Col>
                        <Col md={6}>
                            <div className="sexo">
                                <label>
                                    <input type="radio" className="option-input radio" name="sexo" defaultChecked />
                                    Masculino
                                </label>
                                <br />
                                <label>
                                    <input type="radio" className="option-input radio" name="sexo" />
                                    Feminino
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={{size: 6}}>
                <div className="box">
                    <h1 className="subtitle">
                        Endereço
                    </h1>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="logradouro">Logradouro: </label>
                            <input type="text" id="logradouro" className="form-control input" placeholder="Rua, AV, etc..." />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="numero">Número: </label>
                            <input type="number" id="numero" className="form-control input" />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="bairro">Bairro: </label>                                    
                            <input type="text" id="bairro" className="form-control input"/>
                        </Col>
                        <Col md={6}>
                            <label htmlFor="cep">CEP: </label>
                            <input type="text" id="cep" className="form-control input" />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="municipio">Municipio: </label>
                            <input type="text" id="municipio" className="form-control input" />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="uf">UF: </label>                                    
                            <select id="uf" className="form-control input">
                                <option value="ACRE">ACRE</option>
                                <option value="ALAGOAS">ALAGOAS</option>
                                <option value="AMAPÁ">AMAPÁ</option>
                                <option value="AMAZONAS">AMAZONAS</option>
                                <option value="BAHIA">BAHIA</option>
                                <option value="CEARÁ">CEARÁ</option>
                                <option value="DISTRITO FEDERAL">DISTRITO FEDERAL</option>
                                <option value="ESPÍRITO SANTO">ESPÍRITO SANTO</option>
                                <option value="GOIÁS">GOIÁS</option>
                                <option value="MARANHÃO">MARANHÃO</option>
                                <option value="MATO GROSSO">MATO GROSSO</option>
                                <option value="MATO GROSSO DO SUL">MATO GROSSO DO SUL</option>
                                <option value="MINAS GERAIS">MINAS GERAIS</option>
                                <option value="PARÁ">PARÁ</option>
                                <option value="PARAÍBA">PARAÍBA</option>
                                <option value="PARANÁ">PARANÁ</option>
                                <option value="PERNAMBUCO">PERNAMBUCO</option>
                                <option value="PIAUÍ">PIAUÍ</option>
                                <option value="RIO DE JANEIRO">RIO DE JANEIRO</option>
                                <option value="RIO GRANDE DO NORTE">RIO GRANDE DO NORTE</option>
                                <option value="RIO GRANDE DO SUL">RIO GRANDE DO SUL</option>
                                <option value="RONDÔNIA">RONDÔNIA</option>
                                <option value="RORAIMA">RORAIMA</option>
                                <option value="SANTA CATARINA">SANTA CATARINA</option>
                                <option value="SÃO PAULO">SÃO PAULO</option>
                                <option value="SERGIPE">SERGIPE</option>
                                <option value="TOCANTINS">TOCANTINS</option>
                            </select>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '32px', marginBottom: '32px'}}>
            <Col md={4}>
                <div className="box">
                    <h1 className="subtitle">
                        Informações adicionais
                    </h1>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="contato_emergencia">Contato de Emergência: </label>                                    
                            <input type="text" id="contato_emergencia" className="form-control input" placeholder="DDD + número" />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="nome_emergencia">Nome: </label>
                            <input type="text" id="nome_emergencia" className="form-control input" placeholder="Nome completo" />                               
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={12}>
                            <label htmlFor="observacao">Observação: </label>                                    
                            <textarea className="form-control input" id="observacao"></textarea>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={4}>
                <div className="box">
                    <h1 className="subtitle">
                        Valor da Sessão
                    </h1>
                    <Row style={{marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="valor_consulta">Valor: </label>                                    
                            <input type="text" value={currency} onChange={handleCurrency} className="form-control input" id="valor_consulta" />
                        </Col>
                        <Col md={6}>
                            Deseja recibo?
                            <div className="recibo">
                                <label>
                                    <input type="radio" className="option-input radio" name="recibo" defaultChecked />
                                    Sim
                                </label>
                                <br />
                                <label>
                                    <input type="radio" className="option-input radio" name="recibo" />
                                    Não
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={4}>
                <div className="box">
                    <h1 className="subtitle">
                        Dados de Acesso ao Sistema
                    </h1>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="usuario">Usuário: </label>                                    
                            <input type="text" className="form-control input" id="usuario" />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="senha">Senha: </label>                                    
                            <input type="password" className="form-control input" id="senha" />
                        </Col>
                    </Row>
                    <Row style={{marginTop: '32px', marginBottom: '32px'}}>
                        <Col md={6}>
                            <label htmlFor="role">Hierarquia: </label>                                    
                            <select className="form-control input" id="role">
                                <option>Teste 1</option>
                                <option>Teste 2</option>
                                <option>Teste 3</option>
                            </select>
                        </Col>
                        <Col md={6}>
                            Cadastro ativo?
                            <div className="cadastro_ativo">
                                <label>
                                    <input type="radio" className="option-input radio" name="cadastro_ativo" defaultChecked />
                                    Sim
                                </label>
                                <br />
                                <label>
                                    <input type="radio" className="option-input radio" name="cadastro_ativo" />
                                    Não
                                </label>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{marginBottom: '100px'}}>
            <Col md={12}>
                <div className="box">
                    <h1 className="subtitle">Salvar dados</h1>
                    <Button>Salvar</Button>
                </div>
            </Col>
        </Row>
        </>
    );
}

const mapDispatchToProps = dispatch => ({
   setPageTitle: title => dispatch(actions.setPageTitle(title))
});

export default connect(null, mapDispatchToProps)(CadastrarPaciente);