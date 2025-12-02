function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    
    const relogio = document.getElementById('relogio');
    if (relogio) {
        relogio.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length <= 11) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
    input.value = valor;
}

function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length <= 11) {
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    input.value = valor;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    return true;
}

function configurarDataMinima() {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    
    const dataInput = document.getElementById('dataAgendamento');
    if (dataInput) {
        const dataMinima = amanha.toISOString().split('T')[0];
        dataInput.setAttribute('min', dataMinima);
    }
}

function validarFormulario(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const form = document.getElementById('formAgendamento');
    
    const cpfInput = document.getElementById('cpfCliente');
    if (!validarCPF(cpfInput.value)) {
        cpfInput.setCustomValidity('CPF inválido');
    } else {
        cpfInput.setCustomValidity('');
    }
    
    const servicoBanho = document.getElementById('servicoBanho');
    const servicoTosa = document.getElementById('servicoTosa');
    
    if (!servicoBanho.checked && !servicoTosa.checked) {
        alert('Selecione pelo menos um serviço');
        return false;
    }
    
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    
    form.classList.add('was-validated');
    processarAgendamento();
    return false;
}

function processarAgendamento() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const nomePet = document.getElementById('nomePet').value;
    const dataAgendamento = document.getElementById('dataAgendamento').value;
    const horarioAgendamento = document.getElementById('horarioAgendamento').value;
    
    const data = new Date(dataAgendamento + 'T00:00:00');
    const dataFormatada = data.toLocaleDateString('pt-BR');
    
    let servicos = [];
    if (document.getElementById('servicoBanho').checked) {
        servicos.push('Banho');
    }
    if (document.getElementById('servicoTosa').checked) {
        servicos.push('Tosa');
    }
    
    let forma = '';
    if (document.getElementById('entregaLocal').checked) {
        forma = 'Entrega no local';
    } else if (document.getElementById('teleBusca').checked) {
        forma = 'Tele-busca';
    }
    
    const mensagem = `Agendamento confirmado!
    
Cliente: ${nomeCliente}
Pet: ${nomePet}
Serviços: ${servicos.join(' e ')}
Forma: ${forma}
Data: ${dataFormatada}
Horário: ${horarioAgendamento}

Entraremos em contato em breve!`;
    
    alert(mensagem);
    
    document.getElementById('formAgendamento').reset();
    document.getElementById('formAgendamento').classList.remove('was-validated');
}

document.addEventListener('DOMContentLoaded', function() {
    
    const cpfInput = document.getElementById('cpfCliente');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            mascaraCPF(this);
        });
    }
    
    const telefoneInput = document.getElementById('telefoneCliente');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            mascaraTelefone(this);
        });
    }
    
    configurarDataMinima();
    
    const form = document.getElementById('formAgendamento');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    }
});