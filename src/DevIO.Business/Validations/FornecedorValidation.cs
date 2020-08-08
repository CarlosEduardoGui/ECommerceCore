using DevIO.Business.Models;
using DevIO.Business.Validations.Documents;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevIO.Business.Validations
{
    public class FornecedorValidation : AbstractValidator<Fornecedor>
    {
        public FornecedorValidation()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido.")
                .Length(2, 100).WithMessage("O campo {PropertyName} precisa ter entre {MinLenght} e {MaxLenght} caracteres.");

            When(x => x.TipoFornecedor == TipoFornecedor.PessoaFisica, () =>
            {
                RuleFor(x => x.Documento.Length).Equal(CpfValidacao.TamanhoCpf)
                .WithMessage("O campo Documento precisa ter {ComparisonValue} caracteres e for fornecido {PropertyValue}.");

                RuleFor(x => CpfValidacao.Validar(x.Documento)).Equal(true)
                .WithMessage("O documento fornecido é inválido");
            });


            When(x => x.TipoFornecedor == TipoFornecedor.PessoaFisica, () =>
            {
                RuleFor(x => x.Documento.Length).Equal(CnpjValidacao.TamanhoCnpj)
                .WithMessage("O campo Documento precisa ter {ComparisonValue} caracteres e for fornecido {PropertyValue}.");

                RuleFor(x => CnpjValidacao.Validar(x.Documento)).Equal(true)
                .WithMessage("O documento fornecido é inválido");
            });

        }
    }
}
