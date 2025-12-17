export function calcularIdadePet(dataNascimento: string | Date): string {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let anos = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNasc = nascimento.getMonth();

  // Ajuste se o mês atual ainda não chegou ou é o mês do nascimento mas o dia ainda não chegou
  if (mesAtual < mesNasc || (mesAtual === mesNasc && hoje.getDate() < nascimento.getDate())) {
    anos--;
  }

  if (anos < 1) {
    const meses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 + (mesAtual - mesNasc);
    return `${meses} mês${meses !== 1 ? 'es' : ''}`;
  }

  return `${anos} ano${anos !== 1 ? 's' : ''}`;
}
