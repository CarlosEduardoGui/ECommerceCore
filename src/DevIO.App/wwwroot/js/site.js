function AjaxModal() {

    jQuery(document).ready(function () {

        jQuery(function () {

            jQuery.ajaxSetup({ cache: false });

            jQuery("a[data-modal]").on("click",
                function (e) {
                    jQuery('#myModalContent').load(this.href,
                        function () {
                            jQuery('#myModal').modal({
                                keyboard: true
                            },
                                'show');
                            bindForm(this);
                        });

                    return false;
                });
        });

        function bindForm(dialog) {
            jQuery('form', dialog).submit(function () {

                jQuery.ajax({
                    url: this.action,
                    type: this.method,
                    data: jQuery(this).serialize(),
                    success: function (result) {
                        if (result.success) {
                            jQuery('#myModal').modal('hide');
                            jQuery('#EnderecoTarget').load(result.url);
                        } else {
                            jQuery('#myModalContent').html(result);
                            bindForm(dialog);
                        }
                    }
                });

                return false;
            });
        }
    });
}


function BuscaCEP() {
    jQuery(document).ready(function () {

        function limpa_formulario_cep() {
            //Limpa valores do formulário de cep.
            jQuery("#Endereco_Logradouro").val("");
            jQuery("#Endereco_Bairro").val("");
            jQuery("#Endereco_Cidade").val("");
            jQuery("#Endereco_Estado").val("");

        }

        //Quando o campo CEP perde o foco.
        jQuery("#Endereco_Cep").blur(function () {

            //Nova variável "cep" somente com dígitos.
            var cep = jQuery(this).val().replace(/\D/g, '');

            //Verifica se o campo possui valor informado.
            if (cep != "") {

                //Expressão reguçar para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if (validacep.test(cep)) {

                    //Preenche os campos com "..." enquanto consulta webservice.
                    jQuery("#Endereco_Logradouro").val("");
                    jQuery("#Endereco_Bairro").val("");
                    jQuery("#Endereco_Cidade").val("");
                    jQuery("#Endereco_Estado").val("");

                    //Consulta o webservice viacep.com.br/
                    jQuery.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?",
                        function (dados) {

                            if (!("erro" in dados)) {

                                //Atualiza os campos com os valores da Consulta
                                jQuery("#Endereco_Logradouro").val(dados.logradouro);
                                jQuery("#Endereco_Bairro").val(dados.bairro);
                                jQuery("#Endereco_Cidade").val(dados.localidade);
                                jQuery("#Endereco_Estado").val(dados.uf);
                            }
                            else {
                                limpa_formulario_cep();
                                alert("CEP não encontrado.");
                            }
                        });
                } else {
                    //CEP inválido
                    limpa_formulario_cep();
                    alert("Formato de CEP inválido.");
                }
            } else {
                //CEP sem valor, limpa formulário
                limpa_formulario_cep();
            }

        });
    });
}