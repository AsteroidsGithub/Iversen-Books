const GCD: React.FC<{ numerator: number; denominator: number }> = ({ numerator, denominator }) => {
  if (denominator === 0)
    return (
      <span>
        0<br />
        Student requires more help to correct.
      </span>
    );
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const gcdResult = gcd(numerator, denominator);

  console.log(gcd(numerator, denominator));
  console.log(numerator, denominator);
  console.log(numerator / gcdResult, denominator / gcdResult);
  return (
    <span>
      <sup>{numerator / gcdResult}</sup>&frasl;<sub>{denominator / gcdResult}</sub>
      <br />
      {numerator / gcdResult >= 7
        ? 'Student requires more help to correct.'
        : 'Student has a good ability to correct.'}
    </span>
  );
};

export default GCD;
