# frozen_string_literal: true

module Trickster
  def tricks(*modules)
    modules.each(&method(:include))
  end
end